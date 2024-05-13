import { Option } from "fp-ts/Option";

import { Post } from "../domain/Post";
import { PostId } from "../domain/PostId";
import { PostRepository } from "../domain/PostRepository";

export class NullPostRepository implements PostRepository {
	save(_post: Post): void {}

	search(_id: PostId): Option<Post> {
		return Option.none();
	}
}
