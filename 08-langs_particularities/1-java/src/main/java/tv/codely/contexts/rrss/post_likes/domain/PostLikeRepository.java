package tv.codely.contexts.rrss.post_likes.domain;

public interface PostLikeRepository {
    void save(PostLike post);

    PostLike search(String id);
}
