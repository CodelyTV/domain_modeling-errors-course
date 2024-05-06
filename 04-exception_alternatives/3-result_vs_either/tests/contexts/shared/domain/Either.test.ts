import { Either } from "../../../../src/contexts/shared/domain/Either";

describe("Either should", () => {
	it("get the right value", () => {
		const either = Either.right(1);

		expect(either.get()).toBe(1);
	});

	it("get the left value", () => {
		const either = Either.left(1);

		expect(either.getLeft()).toBe(1);
	});

	it("map a right value", () => {
		const either = Either.right(1);

		expect(either.map((value) => value * 5).get()).toBe(5);
	});

	it("not map a left value", () => {
		const either = leftEither(1);

		expect(either.map((value) => value * 5).getLeft()).toBe(1);
	});
});

function leftEither(value: number): Either<number, number> {
	return Either.left(value);
}
