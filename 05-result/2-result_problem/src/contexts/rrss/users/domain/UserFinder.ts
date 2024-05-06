import { Result } from "../../../shared/domain/Result";
import { User } from "./User";
import { UserDoesNotExistError } from "./UserDoesNotExistError";
import { UserId } from "./UserId";
import { UserRepository } from "./UserRepository";

export class UserFinder {
	constructor(private readonly repository: UserRepository) {}

	async find(id: string): Promise<Result<User, UserDoesNotExistError>> {
		const user = await this.repository.search(new UserId(id));

		if (user === null) {
			return Result.error(new UserDoesNotExistError(id));
		}

		return Result.ok(user);
	}
}
