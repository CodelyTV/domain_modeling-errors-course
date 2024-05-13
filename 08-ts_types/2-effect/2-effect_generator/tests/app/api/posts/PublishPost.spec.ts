/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

import { PostIdMother } from "../../../contexts/rrss/posts/domain/PostIdMother";
import { UserIdMother } from "../../../contexts/rrss/users/domain/UserIdMother";
import { PlaywrightRequest } from "../../../contexts/shared/infrastructure/PlaywrightRequest";

test("returns bad request publishing an empty post", async ({ request }) => {
	const postId = PostIdMother.create().value;
	const userId = UserIdMother.create().value;
	const postContent = "";

	const response = await PlaywrightRequest(request).put(`/api/posts/${postId}`, {
		userId,
		content: postContent,
	});
	const responseBody = await response.json();

	expect(response.status()).toBe(400);

	expect(responseBody).toEqual({
		error: {
			type: "PostContentIsEmptyError",
			description: "Post content is empty",
			data: {},
		},
	});
});

test("returns bad request publishing a too long post", async ({ request }) => {
	const postId = PostIdMother.create().value;
	const userId = UserIdMother.create().value;
	const postContent = faker.string.alpha(500);

	const response = await PlaywrightRequest(request).put(`/api/posts/${postId}`, {
		userId,
		content: postContent,
	});
	const responseBody = await response.json();

	expect(response.status()).toBe(400);

	expect(responseBody).toEqual({
		error: {
			type: "PostContentTooLongError",
			description: `The post content <<< ${postContent} >>> is longer than 280 characters.`,
			data: {
				content: postContent,
				maxLength: 280,
			},
		},
	});
});

test("publish a valid post", async ({ request }) => {
	const postId = PostIdMother.create().value;
	const userId = UserIdMother.create().value;
	const postContent = faker.string.alpha(140);

	const response = await PlaywrightRequest(request).put(`/api/posts/${postId}`, {
		userId,
		content: postContent,
	});

	expect(response.status()).toBe(201);
});
