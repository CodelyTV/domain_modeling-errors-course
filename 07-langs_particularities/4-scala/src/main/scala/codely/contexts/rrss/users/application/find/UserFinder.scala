package codely.contexts.rrss.users.application.find

import codely.contexts.rrss.users.domain.{UserDoesNotExistError, UserRepository, User}

class UserFinder(repository: UserRepository) {
	def find(id: String): Either[UserDoesNotExistError, User] = {
		repository.search(id) match {
			case None => Left(UserDoesNotExistError(id))
			case Some(user) => Right(user)
		}
	}
}
