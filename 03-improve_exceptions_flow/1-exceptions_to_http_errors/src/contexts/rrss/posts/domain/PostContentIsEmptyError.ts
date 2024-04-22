import { DomainError } from "../../../shared/domain/DomainError";

export class PostContentIsEmptyError extends DomainError {
	errorName = "PostContentIsEmptyError";
	message = "Post content is empty";
}
