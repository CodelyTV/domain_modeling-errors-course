import { Primitives } from "@codelytv/primitives-type";

import { Optional } from "../../../../shared/domain/Optional";
import { Post } from "../../domain/Post";
import { PostDoesNotExistError } from "../../domain/PostDoesNotExistError";
import { PostId } from "../../domain/PostId";
import { PostRepository } from "../../domain/PostRepository";

export type PostPrimitives = Primitives<Post>;

export type PostFinderErrors = PostDoesNotExistError;

export class PostFinder {
	constructor(private readonly repository: PostRepository) {}

	async find(id: string): Promise<Optional<PostPrimitives>> {
		const post = await this.repository.searchWithOptional(new PostId(id));

		return post.map((post) => post.toPrimitives());
	}
}
