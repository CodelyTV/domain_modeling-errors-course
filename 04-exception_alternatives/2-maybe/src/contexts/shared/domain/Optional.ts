type None = {
	kind: "none";
};

type Some<T> = {
	kind: "some";
	someValue: T;
};

export class Optional<T> {
	private constructor(private readonly value: None | Some<T>) {}

	static of<T>(value: T): Optional<T> {
		return new Optional({ kind: "some", someValue: value });
	}

	static empty<T>(): Optional<T> {
		return new Optional({ kind: "none" });
	}

	get(): T {
		return this.fold(
			() => {
				throw Error("Value is empty");
			},
			(someValue) => someValue,
		);
	}

	map<R>(mapper: (value: T) => R): Optional<R> {
		return this.fold(
			() => Optional.empty(),
			(someValue) => Optional.of(mapper(someValue)),
		);
	}

	fold<EmptyReturnType, SomeReturnType>(
		emptyFn: () => EmptyReturnType,
		valueFn: (someValue: T) => SomeReturnType,
	): EmptyReturnType | SomeReturnType {
		switch (this.value.kind) {
			case "none":
				return emptyFn();
			case "some":
				return valueFn(this.value.someValue);
		}
	}

	isPresent(): boolean {
		return this.value.kind === "some";
	}

	isEmpty(): boolean {
		return !this.isPresent();
	}

	orElse(other: T): T {
		return this.fold(
			() => other,
			(someValue) => someValue,
		);
	}
}
