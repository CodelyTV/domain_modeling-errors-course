import { StringValueObject } from "../../../shared/domain/StringValueObject";
import { PostContentIsEmptyError } from "./PostContentIsEmptyError";
import { PostContentTooLongError } from "./PostContentTooLongError";

export class PostContent extends StringValueObject {
	public static readonly postMaxLength = 280;

	constructor(value: string) {
		if (value.length === 0) {
			throw new PostContentIsEmptyError();
		}

		if (value.length > PostContent.postMaxLength) {
			throw new PostContentTooLongError(value, PostContent.postMaxLength);
		}

		super(value);
	}
}
