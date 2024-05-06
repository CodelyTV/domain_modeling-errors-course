import { Primitives } from "@codelytv/primitives-type";

import { Post } from "../../domain/Post";
import { PostDoesNotExistError } from "../../domain/PostDoesNotExistError";
import { PostId } from "../../domain/PostId";
import { PostRepository } from "../../domain/PostRepository";

export type PostPrimitives = Primitives<Post>;

export type PostFinderErrors = PostDoesNotExistError;

export class OldPostFinder {
	constructor(private readonly repository: PostRepository) {}

	async find(id: string): Promise<PostPrimitives> {
		const post = await this.repository.search(new PostId(id));

		if (!post) {
			throw new PostDoesNotExistError(id);
		}

		return post.toPrimitives();
	}
}
