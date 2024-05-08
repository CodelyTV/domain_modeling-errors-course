package codely.contexts.rrss.post_likes.application.like

import codely.contexts.rrss.post_likes.domain.{PostLike, PostLikeRepository}
import codely.contexts.rrss.posts.application.find.PostFinder
import codely.contexts.rrss.users.application.find.UserFinder
import codely.contexts.rrss.posts.domain.PostDoesNotExistError
import codely.contexts.rrss.users.domain.UserDoesNotExistError
import codely.contexts.shared.domain.EventBus

class PostLiker(postFinder: PostFinder, userFinder: UserFinder, repository: PostLikeRepository, eventBus: EventBus) {
	def like(
		id: String,
		postId: String,
		likerUserId: String
	): Either[PostDoesNotExistError | UserDoesNotExistError, Unit] = {
		postFinder.find(postId).flatMap { _ =>
			userFinder.find(likerUserId).flatMap { _ =>
				val postLike = PostLike(id)

				repository.save(postLike)
				eventBus.publish(postLike.pullDomainEvents())

				Right(())
			}
		}
	}
}
