import * as E from "fp-ts/Either";
import { Either } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

import { PostId } from "../../../posts/domain/PostId";
import { UserDoesNotExistError } from "../../domain/UserDoesNotExistError";
import { UserRepository } from "../../domain/UserRepository";
import { UserPrimitives } from "../UserPrimitives";

export type UserFinderErrors = UserDoesNotExistError;

export class UserFinder {
	constructor(private readonly repository: UserRepository) {}

	find(id: string): Either<UserDoesNotExistError, UserPrimitives> {
		return pipe(
			this.repository.search(new PostId(id)),
			O.map((user) => user.toPrimitives()),
			E.fromOption(() => new UserDoesNotExistError(id)),
		);
	}
}
