package tv.codely.contexts.rrss.users.domain;

public class UserDoesNotExistError extends Exception {
    public UserDoesNotExistError(String id) {
        super(String.format("The user <%s> does not exist", id));
    }
}
