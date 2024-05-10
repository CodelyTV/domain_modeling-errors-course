package codely.contexts.rrss.post_likes.domain

import codely.contexts.shared.domain.DomainEvent

enum PostLikeError:
	case PostLikeIdTooShort(id: String) extends PostLikeError

case class PostLike(id: String) {
	def pullDomainEvents(): Seq[PostLikeDomainEvent] = Seq(DomainEvent())
}

object PostLike:
	def fromPrimitives(id: String): Either[PostLikeError, PostLike] = PostLike(id)
end PostLike
