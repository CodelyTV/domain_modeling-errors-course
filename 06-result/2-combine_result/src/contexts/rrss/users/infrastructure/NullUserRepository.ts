import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { User } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";

export class NullUserRepository implements UserRepository {
	async save(_user: User): Promise<void> {}

	async search(_id: UserId): Promise<User | null> {
		return Promise.resolve(null);
	}

	async matching(_criteria: Criteria): Promise<User[]> {
		return Promise.resolve([]);
	}
}
