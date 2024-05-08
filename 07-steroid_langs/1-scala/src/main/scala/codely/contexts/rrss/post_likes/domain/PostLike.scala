package codely.contexts.rrss.post_likes.domain

import codely.contexts.shared.domain.DomainEvent

case class PostLike(id: String) {
	def pullDomainEvents(): Seq[PostLikeDomainEvent] = Seq(DomainEvent())
}
