package codely.contexts.rrss.posts.application.find

import codely.contexts.rrss.posts.domain.{Post, PostDoesNotExistError, PostId, PostRepository}

class PostFinder(repository: PostRepository) {
	def find(id: String): Either[PostDoesNotExistError, Post] = {
		repository.search(PostId(id)) match {
			case None => Left(PostDoesNotExistError(id))
			case Some(post) => Right(post)
		}
	}
}
