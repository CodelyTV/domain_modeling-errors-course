import { UserDoesNotExistError } from "../../../../src/contexts/rrss/users/domain/UserDoesNotExistError";
import { Result } from "../../../../src/contexts/shared/domain/Result";

describe("Result should", () => {
	it("get the ok value", () => {
		const either = Result.ok(1);

		expect(either.get()).toBe(1);
	});

	it("get the error value", () => {
		const either = Result.error(new UserDoesNotExistError("1"));

		expect(either.getError()).toStrictEqual(new UserDoesNotExistError("1"));
	});

	it("map a ok value", () => {
		const either = Result.ok(1);

		expect(either.map((value) => value * 5).get()).toBe(5);
	});
});
