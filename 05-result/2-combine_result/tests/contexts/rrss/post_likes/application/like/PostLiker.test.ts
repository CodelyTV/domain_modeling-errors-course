import { PostLiker } from "../../../../../../src/contexts/rrss/post_likes/application/like/PostLiker";
import { PostFinder } from "../../../../../../src/contexts/rrss/posts/application/find/PostFinder";
import { PostDoesNotExistError } from "../../../../../../src/contexts/rrss/posts/domain/PostDoesNotExistError";
import { UserFinder } from "../../../../../../src/contexts/rrss/users/application/find/UserFinder";
import { UserDoesNotExistError } from "../../../../../../src/contexts/rrss/users/domain/UserDoesNotExistError";
import { Result } from "../../../../../../src/contexts/shared/domain/Result";
import { MockClock } from "../../../../shared/infrastructure/MockClock";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { PostIdMother } from "../../../posts/domain/PostIdMother";
import { PostMother } from "../../../posts/domain/PostMother";
import { MockPostRepository } from "../../../posts/infrastructure/MockPostRepository";
import { UserIdMother } from "../../../users/domain/UserIdMother";
import { UserMother } from "../../../users/domain/UserMother";
import { MockUserRepository } from "../../../users/infrastructure/MockUserRepository";
import { PostLikedDomainEventMother } from "../../domain/PostLikedDomainEventMother";
import { PostLikeIdMother } from "../../domain/PostLikeIdMother";
import { PostLikeMother } from "../../domain/PostLikeMother";
import { MockPostLikeRepository } from "../../infrastructure/MockPostLikeRepository";

describe("PostLiker should", () => {
	const postRepository = new MockPostRepository();
	const userRepository = new MockUserRepository();

	const clock = new MockClock();
	const repository = new MockPostLikeRepository();
	const eventBus = new MockEventBus();

	const postLiker = new PostLiker(
		new PostFinder(postRepository),
		new UserFinder(userRepository),
		clock,
		repository,
		eventBus,
	);

	it("return an error liking a non existing post", async () => {
		const postId = PostIdMother.create();

		const expectedError = new PostDoesNotExistError(postId.value);

		postRepository.shouldSearchAndReturnNull(postId);

		expect(
			await postLiker.like(
				PostLikeIdMother.create().value,
				postId.value,
				UserIdMother.create().value,
			),
		).toEqual(Result.error(expectedError));
	});

	it("throw an error liking a post when the liker does not exist", async () => {
		const existingPost = PostMother.create();
		const likerUserId = UserIdMother.create();

		const expectedError = new UserDoesNotExistError(likerUserId.value);

		postRepository.shouldSearch(existingPost);
		userRepository.shouldSearchAndReturnNull(likerUserId);

		expect(
			await postLiker.like(
				PostLikeIdMother.create().value,
				existingPost.id.value,
				likerUserId.value,
			),
		).toEqual(Result.error(expectedError));
	});

	it("like a post", async () => {
		const expectedPostLike = PostLikeMother.create();
		const expectedPostLikePrimitives = expectedPostLike.toPrimitives();

		const expectedDomainEvent = PostLikedDomainEventMother.create(expectedPostLikePrimitives);

		postRepository.shouldSearch(PostMother.create({ id: expectedPostLike.postId.value }));
		userRepository.shouldSearch(UserMother.create({ id: expectedPostLike.likerUserId.value }));

		clock.shouldGenerate(expectedPostLike.likedAt);
		repository.shouldSave(expectedPostLike);
		eventBus.shouldPublish([expectedDomainEvent]);

		expect(
			await postLiker.like(
				expectedPostLikePrimitives.id,
				expectedPostLikePrimitives.postId,
				expectedPostLikePrimitives.likerUserId,
			),
		).toEqual(Result.ok());
	});
});
