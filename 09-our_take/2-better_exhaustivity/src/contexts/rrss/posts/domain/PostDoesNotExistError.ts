import { CodelyError } from "../../../shared/domain/CodelyError";

export class PostDoesNotExistError extends CodelyError {
	readonly message = "PostDoesNotExistError";

	constructor(id: string) {
		super({ id });
	}
}
