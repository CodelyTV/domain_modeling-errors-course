package codely.contexts.rrss.users.domain

import codely.contexts.shared.domain.DomainError

case class UserDoesNotExistError(id: String) extends DomainError
