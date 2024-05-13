import { Effect, Option } from "effect";

import { UserDoesNotExistError } from "../../domain/UserDoesNotExistError";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";
import { UserPrimitives } from "../UserPrimitives";

export type UserFinderErrors = UserDoesNotExistError;

export class UserFinder {
	constructor(private readonly repository: UserRepository) {}

	find(id: string): Effect.Effect<UserPrimitives, UserDoesNotExistError> {
		const user = this.repository.search(new UserId(id));

		return Option.match(user, {
			onNone: () => Effect.fail(new UserDoesNotExistError(id)),
			onSome: (value) => Effect.succeed(value.toPrimitives()),
		});
	}
}
