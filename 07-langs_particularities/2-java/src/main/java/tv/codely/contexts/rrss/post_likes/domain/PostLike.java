package tv.codely.contexts.rrss.post_likes.domain;

public record PostLike(String id, String postId, String likerUserId) {
    public static PostLike like(String id, String postId, String likerUserId) {
        return new PostLike(id, postId, likerUserId);
    }
}
