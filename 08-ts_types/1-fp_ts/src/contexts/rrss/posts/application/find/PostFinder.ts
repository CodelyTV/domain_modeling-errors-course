import { Primitives } from "@codelytv/primitives-type";
import { Either } from "fp-ts/Either";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

import { Post } from "../../domain/Post";
import { PostDoesNotExistError } from "../../domain/PostDoesNotExistError";
import { PostId } from "../../domain/PostId";
import { PostRepository } from "../../domain/PostRepository";

export type PostPrimitives = Primitives<Post>;

export type PostFinderErrors = PostDoesNotExistError;

export class PostFinder {
	constructor(private readonly repository: PostRepository) {}

	find(id: string): Either<PostDoesNotExistError, PostPrimitives> {
		return pipe(
			this.repository.search(new PostId(id)),
			O.map((post) => post.toPrimitives()),
			E.fromOption(() => new PostDoesNotExistError(id)),
		);
	}
}
