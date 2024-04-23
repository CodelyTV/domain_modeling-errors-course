import { DomainError } from "../../../shared/domain/DomainError";

export class PostContentTooLongError extends DomainError {
	constructor(
		public readonly content: string,
		public readonly maxLength: number,
	) {
		super(
			"PostContentTooLongError",
			`The post content <<< ${content} >>> is longer than ${maxLength} characters.`,
			{ content, maxLength },
		);
	}
}
