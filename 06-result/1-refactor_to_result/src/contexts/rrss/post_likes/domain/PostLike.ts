import { Primitives } from "@codelytv/primitives-type";

import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Clock } from "../../../shared/domain/Clock";
import { PostId } from "../../posts/domain/PostId";
import { UserId } from "../../users/domain/UserId";
import { PostLikedDomainEvent } from "./PostLikedDomainEvent";
import { PostLikeId } from "./PostLikeId";

export class PostLike extends AggregateRoot {
	private constructor(
		public readonly id: PostLikeId,
		public readonly postId: PostLikeId,
		public readonly likerUserId: UserId,
		public readonly likedAt: Date,
	) {
		super();
	}

	static like(id: string, postId: string, likerUserId: string, clock: Clock): PostLike {
		const post = new PostLike(
			new PostLikeId(id),
			new PostId(postId),
			new UserId(likerUserId),
			clock.now(),
		);

		post.record(new PostLikedDomainEvent(id, postId, likerUserId));

		return post;
	}

	static fromPrimitives(primitives: Primitives<PostLike>): PostLike {
		return new PostLike(
			new PostLikeId(primitives.id),
			new PostId(primitives.postId),
			new UserId(primitives.likerUserId),
			primitives.likedAt as Date,
		);
	}

	toPrimitives(): Primitives<PostLike> {
		return {
			id: this.id.value,
			likerUserId: this.likerUserId.value,
			postId: this.postId.value,
			likedAt: this.likedAt,
		};
	}
}
