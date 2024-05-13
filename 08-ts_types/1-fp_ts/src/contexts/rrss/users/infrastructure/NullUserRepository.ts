import { Option } from "fp-ts/Option";

import { User } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";

export class NullUserRepository implements UserRepository {
	save(_user: User): void {}

	search(_id: UserId): Option<User> {
		return Promise.resolve(null);
	}
}
