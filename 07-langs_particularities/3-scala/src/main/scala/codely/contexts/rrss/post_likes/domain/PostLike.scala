package codely.contexts.rrss.post_likes.domain

import codely.contexts.shared.domain.DomainEvent

case class PostLikeDomainEvent() extends DomainEvent

enum PostLikeError:
	case PostLikeIdTooShort(id: String) extends PostLikeError

object PostLike {
	def fromPrimitives(id: String): Either[PostLikeError, PostLike] = Right(PostLike(id))
}

case class PostLike(id: String) {
	def pullDomainEvents(): Seq[PostLikeDomainEvent] = Seq()
}
