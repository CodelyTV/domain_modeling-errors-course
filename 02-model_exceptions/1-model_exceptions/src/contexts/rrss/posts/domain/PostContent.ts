import { StringValueObject } from "../../../shared/domain/StringValueObject";
import { PostContentIsEmptyError } from "./PostContentIsEmptyError";
import { PostContentTooLongError } from "./PostContentTooLongError";

export class PostContent extends StringValueObject {
	private static readonly maxLength = 280;

	constructor(value: string) {
		if (value.length === 0) {
			throw new PostContentIsEmptyError();
		}

		if (value.length > PostContent.maxLength) {
			throw new PostContentTooLongError(value, PostContent.maxLength);
		}

		super(value);
	}
}
