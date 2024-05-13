package tv.codely.contexts.rrss.posts.domain;

public class PostDoesNotExistError extends Exception {
    public PostDoesNotExistError(String id) {
        super(String.format("The post <%s> does not exist", id));
    }
}
