/* eslint-disable no-console,no-case-declarations */
type UserNameTooLongError = {
	type: "UserNameTooLongError";
	message: string;
};

type UserPostAlreadyLikedError = {
	type: "UserPostAlreadyLikedError";
	message: string;
};

type PostAlreadyExistsError = {
	type: "PostAlreadyExistsError";
	message: string;
};

type Errors = UserNameTooLongError | UserPostAlreadyLikedError | PostAlreadyExistsError;

function _handleErrors(error: Errors): void {
	switch (error.type) {
		case "UserNameTooLongError":
			console.log("User type is too long");
			break;
		case "UserPostAlreadyLikedError":
			console.log("User already liked this post");
			break;
		case "PostAlreadyExistsError":
			console.log("Post already exists");
			break;
		default:
			const exhaustiveCheck: never = error;

			return exhaustiveCheck;
	}
}
