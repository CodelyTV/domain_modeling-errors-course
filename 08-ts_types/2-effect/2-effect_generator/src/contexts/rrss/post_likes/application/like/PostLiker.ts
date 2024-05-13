import { Effect, pipe } from "effect";

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

	like(id: string, postId: string, likerUserId: string): Effect.Effect<void, PostLikerErrors> {
		return pipe(
			this.postFinder.find(postId),
			(_postPrimitives) => this.userFinder.find(likerUserId),
			Effect.map((_userPrimitives) => {
				const postLike = PostLike.like(id, postId, likerUserId, this.clock);

				this.repository.save(postLike);
				this.eventBus.publish(postLike.pullDomainEvents());

				return undefined;
			}),
		);
	}
}
