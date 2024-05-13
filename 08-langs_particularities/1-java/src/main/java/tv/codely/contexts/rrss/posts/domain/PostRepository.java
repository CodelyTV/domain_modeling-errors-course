package tv.codely.contexts.rrss.posts.domain;

public interface PostRepository {
    void save(Post post);

    Post search(String id);
}
