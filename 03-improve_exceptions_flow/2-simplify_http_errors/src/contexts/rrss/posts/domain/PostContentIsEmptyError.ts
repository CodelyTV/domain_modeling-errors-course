import { DomainError } from "../../../shared/domain/DomainError";

export class PostContentIsEmptyError extends DomainError {
	type = "PostContentIsEmptyError";
	message = "Post content is empty";
}
