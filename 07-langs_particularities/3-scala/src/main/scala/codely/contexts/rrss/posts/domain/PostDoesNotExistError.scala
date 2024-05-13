package codely.contexts.rrss.posts.domain

import codely.contexts.shared.domain.DomainError

case class PostDoesNotExistError(id: String) extends DomainError
