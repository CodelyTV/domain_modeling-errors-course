package codely.contexts.rrss.users.application.find

import codely.contexts.rrss.users.domain.{User, UserDoesNotExistError, UserId, UserRepository}

class UserFinder(repository: UserRepository) {
	def find(id: String): Either[UserDoesNotExistError, User] = {
		repository.search(UserId(id)) match {
			case None => Left(UserDoesNotExistError(id))
			case Some(user) => Right(user)
		}
	}
}
