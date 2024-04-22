import { UserPrimitives } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";

export class UserSearcher {
	constructor(private readonly repository: UserRepository) {}

	async search(id: string): Promise<UserPrimitives | null> {
		const user = await this.repository.search(new UserId(id));

		return user?.toPrimitives() ?? null;
	}
}
