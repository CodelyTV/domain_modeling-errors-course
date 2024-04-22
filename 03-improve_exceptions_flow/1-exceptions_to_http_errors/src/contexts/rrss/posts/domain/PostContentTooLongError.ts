import { DomainError } from "../../../shared/domain/DomainError";

export class PostContentTooLongError extends DomainError {
	errorName = "PostContentTooLongError";

	constructor(
		public readonly content: string,
		public readonly maxLength: number,
	) {
		super();
	}

	message(): string {
		return `The post content <<< ${this.content} >>> is longer than ${this.maxLength} characters.`;
	}
}
