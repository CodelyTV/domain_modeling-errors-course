import { Clock } from "../../../../shared/domain/Clock";
import { EventBus } from "../../../../shared/domain/event/EventBus";
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

	async publish(id: string, userId: string, content: string): Promise<void> {
		const post = Post.publish(id, userId, content, this.clock);

		await this.repository.save(post);
		await this.eventBus.publish(post.pullDomainEvents());
	}
}
