import { DomainError } from "../../../shared/domain/DomainError";

export class PostContentIsEmptyError extends DomainError {
	readonly type = "PostContentIsEmptyError";
	readonly message = "Post content is empty";
}
