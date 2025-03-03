import { PostFinder } from "../../../../../../src/contexts/rrss/posts/application/find/PostFinder";
import { PostDoesNotExistError } from "../../../../../../src/contexts/rrss/posts/domain/PostDoesNotExistError";
import { PostIdMother } from "../../domain/PostIdMother";
import { PostMother } from "../../domain/PostMother";
import { MockPostRepository } from "../../infrastructure/MockPostRepository";

describe("PostFinder should", () => {
	const repository = new MockPostRepository();
	const finder = new PostFinder(repository);

	it("throw an error finding a non existing post", async () => {
		const postId = PostIdMother.create();

		const expectedError = new PostDoesNotExistError(postId.value);

		repository.shouldSearchAndReturnNull(postId);

		await expect(finder.find(postId.value)).rejects.toThrow(expectedError);
	});

	it("find an existing post", async () => {
		const post = PostMother.create();

		repository.shouldSearch(post);

		expect(await finder.find(post.id.value)).toEqual(post.toPrimitives());
	});
});
