package tv.codely.contexts.rrss.posts.application.find;

import tv.codely.contexts.rrss.posts.domain.Post;
import tv.codely.contexts.rrss.posts.domain.PostDoesNotExistError;
import tv.codely.contexts.rrss.posts.domain.PostRepository;

public record PostFinder(PostRepository repository) {
    public Post find(String id) throws PostDoesNotExistError {
        var post = repository.search(id);

        if (post == null) {
            throw new PostDoesNotExistError(id);
        }

        return post;
    }
}
