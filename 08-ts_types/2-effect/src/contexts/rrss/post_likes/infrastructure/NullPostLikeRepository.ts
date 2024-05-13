import { Option } from "fp-ts/Option";

import { PostLike } from "../domain/PostLike";
import { PostLikeId } from "../domain/PostLikeId";
import { PostLikeRepository } from "../domain/PostLikeRepository";

export class NullPostLikeRepository implements PostLikeRepository {
	save(_postLike: PostLike): void {}

	search(_id: PostLikeId): Option<PostLike> {
		return Promise.resolve(null);
	}
}
