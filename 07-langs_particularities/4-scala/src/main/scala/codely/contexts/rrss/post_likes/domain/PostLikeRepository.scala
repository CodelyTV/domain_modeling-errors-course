package codely.contexts.rrss.post_likes.domain

trait PostLikeRepository {
	def save(post: PostLike): Unit

	def search(postId: PostLikeId): Option[PostLike]
}
