package tv.codely.contexts.rrss.users.domain;

public interface UserRepository {
    void save(User user);

    User search(String id);
}
