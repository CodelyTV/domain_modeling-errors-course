import { Option } from "fp-ts/Option";

import { User } from "./User";
import { UserId } from "./UserId";

export interface UserRepository {
	save(user: User): void;

	search(id: UserId): Option<User>;
}
