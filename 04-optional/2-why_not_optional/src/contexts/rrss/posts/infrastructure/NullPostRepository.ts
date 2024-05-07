import { Optional } from "../../../shared/domain/Optional";
import { Post } from "../domain/Post";
import { PostId } from "../domain/PostId";
import { PostRepository } from "../domain/PostRepository";

export class NullPostRepository implements PostRepository {
	async save(_post: Post): Promise<void> {}

	async search(_id: PostId): Promise<Post | null> {
		return Promise.resolve(null);
	}

	async searchWithOptional(_id: PostId): Promise<Optional<Post>> {
		return Promise.resolve(null);
	}
}
