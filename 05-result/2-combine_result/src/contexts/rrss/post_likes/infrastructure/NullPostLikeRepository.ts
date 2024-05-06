import { PostLike } from "../domain/PostLike";
import { PostLikeId } from "../domain/PostLikeId";
import { PostLikeRepository } from "../domain/PostLikeRepository";

export class NullPostLikeRepository implements PostLikeRepository {
	async save(_postLike: PostLike): Promise<void> {}

	async search(_id: PostLikeId): Promise<PostLike | null> {
		return Promise.resolve(null);
	}
}
