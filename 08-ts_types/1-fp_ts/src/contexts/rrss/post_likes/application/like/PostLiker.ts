import { sequenceT } from "fp-ts/Apply";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

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

	like(id: string, postId: string, likerUserId: string): E.Either<PostLikerErrors, void> {
		return pipe(
			sequenceT(E.Apply)(
				pipe(
					this.postFinder.find(postId),
					E.mapLeft((error: PostDoesNotExistError): PostLikerErrors => error),
				),
				pipe(
					this.userFinder.find(likerUserId),
					E.mapLeft((error: UserDoesNotExistError): PostLikerErrors => error),
				),
			),
			E.map(([_post, _user]) => {
				const postLike = PostLike.like(id, postId, likerUserId, this.clock);
				this.repository.save(postLike);
				this.eventBus.publish(postLike.pullDomainEvents());

				return undefined;
			}),
		);
	}
}
