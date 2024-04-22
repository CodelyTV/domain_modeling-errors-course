import { DomainError } from "../../../shared/domain/DomainError";

export class PostContentTooLongError extends DomainError {
	errorName = "PostContentTooLongError";
	message = `The post content <<< ${this.content} >>> is longer than ${this.maxLength} characters.`;

	constructor(
		public readonly content: string,
		public readonly maxLength: number,
	) {
		super();
	}
}
