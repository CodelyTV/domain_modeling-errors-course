import { DomainError } from "../../../shared/domain/DomainError";

export class UserDoesNotExistError extends DomainError {
	readonly errorName = "UserDoesNotExistError";
	readonly message = `The user ${this.id} does not exist`;

	constructor(public readonly id: string) {
		super();
	}
}
