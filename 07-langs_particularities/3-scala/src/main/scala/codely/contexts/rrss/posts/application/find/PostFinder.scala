package codely.contexts.rrss.posts.application.find

import codely.contexts.rrss.posts.domain.{PostDoesNotExistError, PostRepository, Post}

class PostFinder(repository: PostRepository) {
	def find(id: String): Either[PostDoesNotExistError, Post] = {
		repository.search(id) match {
			case None => Left(PostDoesNotExistError(id))
			case Some(post) => Right(post)
		}
	}
}
