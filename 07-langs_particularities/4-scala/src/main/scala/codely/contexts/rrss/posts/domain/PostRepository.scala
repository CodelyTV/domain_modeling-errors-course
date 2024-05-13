package codely.contexts.rrss.posts.domain

trait PostRepository {
	def save(post: Post): Unit

	def search(postId: PostId): Option[Post]
}
