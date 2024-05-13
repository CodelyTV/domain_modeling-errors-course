package tv.codely.contexts.rrss.users.domain;

import tv.codely.contexts.shared.domain.DomainError;

public class UserDoesNotExistError extends DomainError {
    public UserDoesNotExistError(String id) {
        super(String.format("The user <%s> does not exist", id));
    }
}
