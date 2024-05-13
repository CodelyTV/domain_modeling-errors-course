package codely.app.api

import codely.contexts.rrss.post_likes.application.like.PostLiker
import codely.contexts.rrss.posts.domain.PostDoesNotExistError
import codely.contexts.rrss.users.domain.UserDoesNotExistError
import codely.contexts.shared.infrastructure.Response

class PostLikesPutController(postLiker: PostLiker) {
	def on(id: String, postId: String, likerUserId: String): Response = try {
		postLiker.like(id, postId, likerUserId) match {
			case Left(error) => error match {
				case UserDoesNotExistError(_) => Response(409, error.toString)
				case PostDoesNotExistError(_) => Response(409, error.toString)
			}
			case Right(value) => Response(201, "")
		}
	} catch {
		case error@(_: RuntimeException) => Response(500, error.getMessage)
	}
}
