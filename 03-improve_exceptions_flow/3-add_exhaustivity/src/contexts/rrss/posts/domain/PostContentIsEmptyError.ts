import { DomainError } from "../../../shared/domain/DomainError";

export class PostContentIsEmptyError extends DomainError {
	readonly errorName = "PostContentIsEmptyError";
	readonly message = "Post content is empty";
}
