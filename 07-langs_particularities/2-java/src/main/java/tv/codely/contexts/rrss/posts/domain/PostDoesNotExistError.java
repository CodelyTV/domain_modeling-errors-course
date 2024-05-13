package tv.codely.contexts.rrss.posts.domain;

import tv.codely.contexts.shared.domain.DomainError;

public class PostDoesNotExistError extends DomainError {
    public PostDoesNotExistError(String id) {
        super(String.format("The post <%s> does not exist", id));
    }
}
