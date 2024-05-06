/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DomainError } from "./DomainError";

type Ok<O> = {
	kind: "ok";
	okValue: O;
};

type Error<E extends DomainError> = {
	kind: "error";
	errorValue: E;
};

export class Result<O, E extends DomainError> {
	private constructor(private readonly value: Ok<O> | Error<E>) {}

	static error<O, E extends DomainError>(value: E): Result<O, E> {
		return new Result<O, E>({ kind: "error", errorValue: value });
	}

	static ok<O, E extends DomainError>(value?: O): Result<O, E> {
		return new Result<O, E>({ kind: "ok", okValue: value! });
	}

	isError(): boolean {
		return this.value.kind === "error";
	}

	isOk(): boolean {
		return this.value.kind === "ok";
	}

	get(): O {
		return this.fold(
			(okValue) => okValue,
			() => {
				throw new Error("Cannot get ok value from error result");
			},
		);
	}

	getError(): E {
		return this.fold(
			() => {
				throw new Error("Cannot get error value from ok result");
			},
			(errorValue) => errorValue,
		);
	}

	map<T>(fn: (ok: O) => T): Result<T, E> {
		return this.fold(
			(okValue) => Result.ok(fn(okValue)),
			(errorValue) => Result.error(errorValue),
		);
	}

	flatMap<T, U extends DomainError>(fn: (ok: O) => Result<T, E | U>): Result<T, E | U> {
		return this.fold(
			(okValue) => fn(okValue),
			(errorValue) => Result.error(errorValue),
		);
	}

	async flatMapAsync<T, U extends DomainError>(
		fn: (ok: O) => Promise<Result<T, E | U>>,
	): Promise<Result<T, E | U>> {
		return this.fold(
			async (okValue) => await fn(okValue),
			(errorValue) => Promise.resolve(Result.error<T, E | U>(errorValue)),
		);
	}

	fold<ErrorReturnType, OkReturnType>(
		okFn: (ok: O) => OkReturnType,
		errorFn: (error: E) => ErrorReturnType,
	): ErrorReturnType | OkReturnType {
		switch (this.value.kind) {
			case "ok":
				return okFn(this.value.okValue);
			case "error":
				return errorFn(this.value.errorValue);
		}
	}
}
