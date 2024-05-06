import { UserDoesNotExistError } from "../../domain/UserDoesNotExistError";
import { UserFinder as DomainUserFinder } from "../../domain/UserFinder";
import { UserRepository } from "../../domain/UserRepository";
import { UserPrimitives } from "../UserPrimitives";

export type UserFinderErrors = UserDoesNotExistError;

export class UserFinder {
	private readonly finder: DomainUserFinder;

	constructor(repository: UserRepository) {
		this.finder = new DomainUserFinder(repository);
	}

	async find(id: string): Promise<UserPrimitives> {
		return (await this.finder.find(id)).toPrimitives();
	}
}
