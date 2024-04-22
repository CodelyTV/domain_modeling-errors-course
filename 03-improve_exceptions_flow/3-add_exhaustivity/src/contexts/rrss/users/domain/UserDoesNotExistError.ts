export class UserDoesNotExistError extends Error {
	constructor(public readonly id: string) {
		super(`The user ${id} does not exist`);
	}
}
