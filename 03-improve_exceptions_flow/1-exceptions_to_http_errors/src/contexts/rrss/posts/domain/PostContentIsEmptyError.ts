import { DomainError } from "../../../shared/domain/DomainError";

export class PostContentIsEmptyError extends DomainError {
	errorName = "PostContentIsEmptyError";

	message(): string {
		return "Post content is empty";
	}
}
