import { Primitives } from "@codelytv/primitives-type";

import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Clock } from "../../../shared/domain/Clock";
import { Result } from "../../../shared/domain/Result";
import { UserId } from "../../users/domain/UserId";
import { PostContent } from "./PostContent";
import { PostContentIsEmptyError } from "./PostContentIsEmptyError";
import { PostContentTooLongError } from "./PostContentTooLongError";
import { PostId } from "./PostId";
import { PostLatestLikes } from "./PostLatestLikes";
import { PostPublishedDomainEvent } from "./PostPublishedDomainEvent";
import { PostTotalLikes } from "./PostTotalLikes";

export class Post extends AggregateRoot {
	private constructor(
		public readonly id: PostId,
		public readonly userId: UserId,
		public readonly content: PostContent,
		public totalLikes: PostTotalLikes,
		public latestLikes: PostLatestLikes,
		public readonly createdAt: Date,
	) {
		super();
	}

	static publish(
		id: string,
		userId: string,
		content: string,
		clock: Clock,
	): Result<Post, PostContentIsEmptyError | PostContentTooLongError> {
		return PostContent.create(content).map((postContent) => {
			const post = new Post(
				new PostId(id),
				new UserId(userId),
				postContent,
				PostTotalLikes.init(),
				PostLatestLikes.init(),
				clock.now(),
			);

			post.record(new PostPublishedDomainEvent(id, userId, content));

			return post;
		});
	}

	static fromPrimitives(primitives: Primitives<Post>): Post {
		return new Post(
			new PostId(primitives.id),
			new UserId(primitives.userId),
			new PostContent(primitives.content),
			new PostTotalLikes(primitives.totalLikes),
			PostLatestLikes.fromPrimitives(primitives.latestLikes),
			primitives.createdAt as Date,
		);
	}

	toPrimitives(): Primitives<Post> {
		return {
			id: this.id.value,
			userId: this.userId.value,
			content: this.content.value,
			totalLikes: this.totalLikes.value,
			latestLikes: this.latestLikes.toPrimitives(),
			createdAt: this.createdAt,
		};
	}
}
