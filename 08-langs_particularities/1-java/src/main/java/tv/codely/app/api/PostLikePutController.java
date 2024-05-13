package tv.codely.app.api;

import tv.codely.contexts.rrss.post_likes.application.like.PostLiker;
import tv.codely.contexts.rrss.posts.domain.PostDoesNotExistError;
import tv.codely.contexts.rrss.users.domain.UserDoesNotExistError;
import tv.codely.contexts.shared.infrastructure.Response;

public record PostLikePutController(PostLiker postLiker) {
    public Response on(String id, String postId, String likerUserId) {
        try {
            postLiker.like(id, postId, likerUserId);

            return new Response(201, "");
        } catch (PostDoesNotExistError | UserDoesNotExistError error) {
            return new Response(409, error.getMessage());
        }
    }
}
