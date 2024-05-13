import { Primitives } from "@codelytv/primitives-type";
import { Effect, Option, pipe } from "effect";

import { Post } from "../../domain/Post";
import { PostDoesNotExistError } from "../../domain/PostDoesNotExistError";
import { PostId } from "../../domain/PostId";
import { PostRepository } from "../../domain/PostRepository";

export type PostPrimitives = Primitives<Post>;

export class PostFinder {
	constructor(private readonly repository: PostRepository) {}

	find(id: string): Effect.Effect<PostPrimitives, PostDoesNotExistError> {
		return pipe(
			this.repository.search(new PostId(id)),
			Option.match({
				onNone: () => Effect.fail(new PostDoesNotExistError(id)),
				onSome: (post) => Effect.succeed(post.toPrimitives()),
			}),
		);
	}
}
