import { Primitives } from "@codelytv/primitives-type";

import { Result } from "../../../../shared/domain/Result";
import { Post } from "../../domain/Post";
import { PostDoesNotExistError } from "../../domain/PostDoesNotExistError";
import { PostId } from "../../domain/PostId";
import { PostRepository } from "../../domain/PostRepository";

export type PostPrimitives = Primitives<Post>;

export type PostFinderErrors = PostDoesNotExistError;

export class PostFinder {
	constructor(private readonly repository: PostRepository) {}

	async find(id: string): Promise<Result<PostPrimitives, PostDoesNotExistError>> {
		const post = await this.repository.search(new PostId(id));

		if (!post) {
			return Result.error(new PostDoesNotExistError(id));
		}

		return Result.ok(post.toPrimitives());
	}

	// async find(id: string): Promise<Result<PostPrimitives, PostDoesNotExistError>> {
	// 	const post = await this.repository.searchWithOptional(new PostId(id));
	//
	// 	return post.fold(
	// 		(post) => Result.ok(post.toPrimitives()),
	// 		Result.error(new PostDoesNotExistError(id)),
	// 	);
	// }
}
