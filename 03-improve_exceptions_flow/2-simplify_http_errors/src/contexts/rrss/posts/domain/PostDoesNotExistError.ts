export class PostDoesNotExistError extends Error {
	constructor(public readonly id: string) {
		super(`The post ${id} does not exist`);
	}
}
