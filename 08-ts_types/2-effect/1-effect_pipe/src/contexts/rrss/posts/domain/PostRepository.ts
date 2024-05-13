import { Option } from "effect/Option";

import { Post } from "./Post";
import { PostId } from "./PostId";

export interface PostRepository {
	save(user: Post): void;

	search(id: PostId): Option<Post>;
}
