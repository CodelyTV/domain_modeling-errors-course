package tv.codely.contexts.shared.domain;

public class DomainError extends Exception {
    public DomainError(String message) {
        super(message);
    }
}
