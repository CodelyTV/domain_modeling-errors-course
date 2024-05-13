package tv.codely.contexts.rrss.users.application;

import tv.codely.contexts.rrss.users.domain.User;
import tv.codely.contexts.rrss.users.domain.UserDoesNotExistError;
import tv.codely.contexts.rrss.users.domain.UserRepository;

public record UserFinder(UserRepository repository) {
    public User find(String id) throws UserDoesNotExistError {
        var user = repository.search(id);

        if (user == null) {
            throw new UserDoesNotExistError(id);
        }

        return user;
    }
}
