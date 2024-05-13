import { Option } from "fp-ts/Option";

import { PostLike } from "./PostLike";
import { PostLikeId } from "./PostLikeId";

export interface PostLikeRepository {
	save(postLike: PostLike): void;

	search(id: PostLikeId): Option<PostLike>;
}
