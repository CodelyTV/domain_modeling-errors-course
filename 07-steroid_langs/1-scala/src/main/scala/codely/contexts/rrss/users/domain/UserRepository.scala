package codely.contexts.rrss.users.domain

trait UserRepository {
	def save(post: User): Unit

	def search(postId: UserId): Option[User]
}
