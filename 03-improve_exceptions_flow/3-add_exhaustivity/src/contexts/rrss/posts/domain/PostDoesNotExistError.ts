import { DomainError } from "../../../shared/domain/DomainError";

export class PostDoesNotExistError extends DomainError {
	readonly errorName = "PostDoesNotExistError";
	readonly message = `The post ${this.id} does not exist`;

	constructor(public readonly id: string) {
		super();
	}
}
