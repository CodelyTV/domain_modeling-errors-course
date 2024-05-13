import { Primitives } from "@codelytv/primitives-type";
import { Effect, Option } from "effect";

import { Post } from "../../domain/Post";
import { PostDoesNotExistError } from "../../domain/PostDoesNotExistError";
import { PostId } from "../../domain/PostId";
import { PostRepository } from "../../domain/PostRepository";

export type PostPrimitives = Primitives<Post>;

export class PostFinder {
	constructor(private readonly repository: PostRepository) {}

	find(id: string): Effect.Effect<PostPrimitives, PostDoesNotExistError> {
		const post = this.repository.search(new PostId(id));

		return Option.match(post, {
			onNone: () => Effect.fail(new PostDoesNotExistError(id)),
			onSome: (value) => Effect.succeed(value.toPrimitives()),
		});
	}
}
