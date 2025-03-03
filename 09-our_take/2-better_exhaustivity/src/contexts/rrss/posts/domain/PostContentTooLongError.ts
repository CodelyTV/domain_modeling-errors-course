import { CodelyError } from "../../../shared/domain/CodelyError";

export class PostContentTooLongError extends CodelyError {
	readonly message = "PostContentTooLongError";

	constructor(content: string, maxLength: number) {
		super({ content, maxLength });
	}
}
