export class PostContentIsEmptyError extends Error {
	constructor() {
		super("Post content is empty");
	}
}
