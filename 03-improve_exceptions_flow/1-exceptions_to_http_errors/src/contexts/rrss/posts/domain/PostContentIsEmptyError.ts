import { DomainError } from "../../../shared/domain/DomainError";

export class PostContentIsEmptyError extends DomainError {
	constructor() {
		super("PostContentIsEmptyError", "Post content is empty");
	}
}
