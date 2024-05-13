/* eslint-disable @typescript-eslint/no-this-alias */
import { Effect } from "effect";

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
		const self = this;

		return Effect.gen(function* () {
			yield* self.postFinder.find(postId);
			yield* self.userFinder.find(likerUserId);

			const postLike = PostLike.like(id, postId, likerUserId, self.clock);

			self.repository.save(postLike);
			self.eventBus.publish(postLike.pullDomainEvents());

			return undefined;
		});
	}
}
