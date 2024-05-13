package tv.codely.contexts.rrss.post_likes.application.like;

import tv.codely.contexts.rrss.post_likes.domain.PostLike;
import tv.codely.contexts.rrss.post_likes.domain.PostLikeRepository;
import tv.codely.contexts.rrss.posts.application.find.PostFinder;
import tv.codely.contexts.rrss.posts.domain.PostDoesNotExistError;
import tv.codely.contexts.rrss.users.application.UserFinder;
import tv.codely.contexts.rrss.users.domain.UserDoesNotExistError;

public record PostLiker(PostFinder postFinder, UserFinder userFinder, PostLikeRepository repository) {
    public void like(String id, String postId, String likerUserId) throws PostDoesNotExistError, UserDoesNotExistError {
        postFinder.find(postId);
        userFinder.find(likerUserId);

        var postLike = PostLike.like(id, postId, likerUserId);

        repository.save(postLike);
    }
}
