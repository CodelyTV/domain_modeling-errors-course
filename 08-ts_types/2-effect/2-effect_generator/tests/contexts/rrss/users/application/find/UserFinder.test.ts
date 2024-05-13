import { UserFinder } from "../../../../../../src/contexts/rrss/users/application/find/UserFinder";
import { UserDoesNotExistError } from "../../../../../../src/contexts/rrss/users/domain/UserDoesNotExistError";
import { Result } from "../../../../../../src/contexts/shared/domain/Result";
import { UserIdMother } from "../../domain/UserIdMother";
import { UserMother } from "../../domain/UserMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserFinder should", () => {
	const repository = new MockUserRepository();
	const finder = new UserFinder(repository);

	it("throw an error finding a non existing user", async () => {
		const userId = UserIdMother.create();

		const expectedError = new UserDoesNotExistError(userId.value);

		repository.shouldSearchAndReturnNull(userId);

		expect(await finder.find(userId.value)).toEqual(Result.error(expectedError));
	});

	it("find an existing user", async () => {
		const existingUser = UserMother.create();

		repository.shouldSearch(existingUser);

		expect(await finder.find(existingUser.id.value)).toEqual(
			Result.ok(existingUser.toPrimitives()),
		);
	});
});
