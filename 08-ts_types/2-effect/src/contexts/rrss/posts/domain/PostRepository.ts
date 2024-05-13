import { Option } from "fp-ts/Option";

import { Post } from "./Post";
import { PostId } from "./PostId";

export interface PostRepository {
	save(user: Post): void;

	search(id: PostId): Option<Post>;
}
