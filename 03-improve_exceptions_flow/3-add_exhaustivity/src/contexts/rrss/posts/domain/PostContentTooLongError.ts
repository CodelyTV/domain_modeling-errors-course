import { DomainError } from "../../../shared/domain/DomainError";

export class PostContentTooLongError extends DomainError {
	readonly errorName = "PostContentTooLongError";
	readonly message = `The post content <<< ${this.content} >>> is longer than ${this.maxLength} characters.`;

	constructor(
		public readonly content: string,
		public readonly maxLength: number,
	) {
		super();
	}
}
