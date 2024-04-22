export class PostContentTooLongError extends Error {
	constructor(
		public readonly content: string,
		public readonly maxLength: number,
	) {
		super(`The post content <<< ${content} >>> is longer than ${maxLength} characters.`);
	}
}
