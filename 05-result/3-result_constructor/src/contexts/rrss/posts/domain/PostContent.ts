import { Result } from "../../../shared/domain/Result";
import { StringValueObject } from "../../../shared/domain/StringValueObject";
import { PostContentIsEmptyError } from "./PostContentIsEmptyError";
import { PostContentTooLongError } from "./PostContentTooLongError";

export class PostContent extends StringValueObject {
	public static readonly maxLength = 280;

	constructor(value: string) {
		super(value);
	}

	public static create(
		value: string,
	): Result<PostContent, PostContentIsEmptyError | PostContentTooLongError> {
		if (value.length === 0) {
			return Result.error(new PostContentIsEmptyError());
		}

		if (value.length > PostContent.maxLength) {
			return Result.error(new PostContentTooLongError(value, PostContent.maxLength));
		}

		return Result.ok(new PostContent(value));
	}
}
