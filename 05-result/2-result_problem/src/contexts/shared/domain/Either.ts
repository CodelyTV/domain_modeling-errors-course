type Left<L> = {
	kind: "left";
	leftValue: L;
};

type Right<R> = {
	kind: "right";
	rightValue: R;
};

export class Either<L, R> {
	private constructor(private readonly value: Left<L> | Right<R>) {}

	static left<L, R>(value: L): Either<L, R> {
		return new Either<L, R>({ kind: "left", leftValue: value });
	}

	static right<L, R>(value: R): Either<L, R> {
		return new Either<L, R>({ kind: "right", rightValue: value });
	}

	isLeft(): boolean {
		return this.value.kind === "left";
	}

	isRight(): boolean {
		return this.value.kind === "right";
	}

	get(): R {
		return this.fold(
			() => {
				throw new Error("Cannot get right value from left Either");
			},
			(rightValue) => rightValue,
		);
	}

	getLeft(): L {
		return this.fold(
			(leftValue) => leftValue,
			() => {
				throw new Error("Cannot get left value from right Either");
			},
		);
	}

	map<T>(fn: (r: R) => T): Either<L, T> {
		return this.fold(
			(leftValue) => Either.left(leftValue),
			(rightValue) => Either.right(fn(rightValue)),
		);
	}

	fold<LeftReturnType, RightReturnType>(
		leftFn: (left: L) => LeftReturnType,
		rightFn: (right: R) => RightReturnType,
	): LeftReturnType | RightReturnType {
		switch (this.value.kind) {
			case "left":
				return leftFn(this.value.leftValue);
			case "right":
				return rightFn(this.value.rightValue);
		}
	}
}
