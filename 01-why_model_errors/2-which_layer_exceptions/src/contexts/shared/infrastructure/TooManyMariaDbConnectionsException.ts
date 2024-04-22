export class TooManyMariaDbConnectionsException extends Error {
	constructor() {
		super("Too many MariaDB connections");
	}
}
