import { Clock } from "../../../../shared/domain/Clock";
import { EventBus } from "../../../../shared/domain/event/EventBus";
import { Result } from "../../../../shared/domain/Result";
import { Post } from "../../domain/Post";
import { PostContentIsEmptyError } from "../../domain/PostContentIsEmptyError";
import { PostContentTooLongError } from "../../domain/PostContentTooLongError";
import { PostRepository } from "../../domain/PostRepository";

export type PostPublisherErrors = PostContentIsEmptyError | PostContentTooLongError;

export class PostPublisher {
	constructor(
		private readonly clock: Clock,
		private readonly repository: PostRepository,
		private readonly eventBus: EventBus,
	) {}

	async publish(
		id: string,
		userId: string,
		content: string,
	): Promise<Result<void, PostContentIsEmptyError | PostContentTooLongError>> {
		return await Post.publish(id, userId, content, this.clock).flatMapAsync(async (post) => {
			await this.repository.save(post);
			await this.eventBus.publish(post.pullDomainEvents());

			return Result.ok();
		});
	}
}
