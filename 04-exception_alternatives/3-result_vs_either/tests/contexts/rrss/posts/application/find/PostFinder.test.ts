import { PostFinder } from "../../../../../../src/contexts/rrss/posts/application/find/PostFinder";
import { PostDoesNotExistError } from "../../../../../../src/contexts/rrss/posts/domain/PostDoesNotExistError";
import { Result } from "../../../../../../src/contexts/shared/domain/Result";
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

		expect(await finder.find(postId.value)).toEqual(Result.error(expectedError));
	});

	it("find an existing post", async () => {
		const post = PostMother.create();

		repository.shouldSearch(post);

		expect(await finder.find(post.id.value)).toEqual(Result.ok(post.toPrimitives()));
	});
});
