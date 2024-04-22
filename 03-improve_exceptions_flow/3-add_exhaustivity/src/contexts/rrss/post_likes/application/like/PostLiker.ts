import { Clock } from "../../../../shared/domain/Clock";
import { EventBus } from "../../../../shared/domain/event/EventBus";
import { PostFinder } from "../../../posts/application/find/PostFinder";
import { PostDoesNotExistError } from "../../../posts/domain/PostDoesNotExistError";
import { UserFinder } from "../../../users/application/find/UserFinder";
import { UserDoesNotExistError } from "../../../users/domain/UserDoesNotExistError";
import { PostLike } from "../../domain/PostLike";
import { PostLikeRepository } from "../../domain/PostLikeRepository";

export type PostLikerErrors = PostDoesNotExistError | UserDoesNotExistError;

export class PostLiker {
	constructor(
		private readonly postFinder: PostFinder,
		private readonly userFinder: UserFinder,
		private readonly clock: Clock,
		private readonly repository: PostLikeRepository,
		private readonly eventBus: EventBus,
	) {}

	async like(id: string, postId: string, likerUserId: string): Promise<void> {
		await this.ensurePostExists(postId);
		await this.ensureUserExists(likerUserId);

		const postLike = PostLike.like(id, postId, likerUserId, this.clock);

		await this.repository.save(postLike);
		await this.eventBus.publish(postLike.pullDomainEvents());
	}

	private async ensurePostExists(postId: string): Promise<void> {
		await this.postFinder.find(postId);
	}

	private async ensureUserExists(userId: string): Promise<void> {
		await this.userFinder.find(userId);
	}
}
