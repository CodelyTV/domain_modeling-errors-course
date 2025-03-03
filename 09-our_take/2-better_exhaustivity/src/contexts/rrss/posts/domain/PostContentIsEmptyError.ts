import { CodelyError } from "../../../shared/domain/CodelyError";

export class PostContentIsEmptyError extends CodelyError {
	readonly message = "PostContentIsEmptyError";
}
