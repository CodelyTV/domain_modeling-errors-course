export class UserDoesNotExistError extends Error {
	constructor(id: string) {
		super(`The user ${id} does not exist`);
	}
}
