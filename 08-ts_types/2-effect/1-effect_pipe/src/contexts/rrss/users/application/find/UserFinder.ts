import { Effect, Option, pipe } from "effect";

import { UserDoesNotExistError } from "../../domain/UserDoesNotExistError";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";
import { UserPrimitives } from "../UserPrimitives";

export type UserFinderErrors = UserDoesNotExistError;

export class UserFinder {
	constructor(private readonly repository: UserRepository) {}

	find(id: string): Effect.Effect<UserPrimitives, UserDoesNotExistError> {
		return pipe(
			this.repository.search(new UserId(id)),
			Option.match({
				onNone: () => Effect.fail(new UserDoesNotExistError(id)),
				onSome: (user) => Effect.succeed(user.toPrimitives()),
			}),
		);
	}
}
