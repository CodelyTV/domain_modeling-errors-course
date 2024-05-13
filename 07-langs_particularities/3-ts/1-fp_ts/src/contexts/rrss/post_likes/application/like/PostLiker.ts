import { Clock } from "../../../../shared/domain/Clock";
import { EventBus } from "../../../../shared/domain/event/EventBus";
import { Result } from "../../../../shared/domain/Result";
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

	async like(
		id: string,
		postId: string,
		likerUserId: string,
	): Promise<Result<void, PostDoesNotExistError | UserDoesNotExistError>> {
		return (await this.postFinder.find(postId)).flatMapAsync(async (_post) => {
			return (await this.userFinder.find(likerUserId)).flatMapAsync(async (_user) => {
				const postLike = PostLike.like(id, postId, likerUserId, this.clock);

				await this.repository.save(postLike);
				await this.eventBus.publish(postLike.pullDomainEvents());

				return Result.ok();
			});
		});
	}
}
