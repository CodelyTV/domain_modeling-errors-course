import { User } from "./User";

export interface LegacyUserRepository {
	save(user: User): Promise<void>;
}
