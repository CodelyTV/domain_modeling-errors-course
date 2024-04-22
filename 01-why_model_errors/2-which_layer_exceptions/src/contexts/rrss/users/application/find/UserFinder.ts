import { UserPrimitives } from "../../domain/User";
import { UserDoesNotExistError } from "../../domain/UserDoesNotExistError";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";

export class UserFinder {
	constructor(private readonly repository: UserRepository) {}

	async find(id: string): Promise<UserPrimitives> {
		const user = await this.repository.search(new UserId(id));

		if (user === null) {
			throw new UserDoesNotExistError(id);
		}

		return user.toPrimitives();
	}
}
