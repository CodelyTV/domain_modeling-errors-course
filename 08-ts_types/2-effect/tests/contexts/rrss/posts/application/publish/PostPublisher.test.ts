import { faker } from "@faker-js/faker";

import { PostPublisher } from "../../../../../../src/contexts/rrss/posts/application/publish/PostPublisher";
import { PostContentIsEmptyError } from "../../../../../../src/contexts/rrss/posts/domain/PostContentIsEmptyError";
import { PostContentTooLongError } from "../../../../../../src/contexts/rrss/posts/domain/PostContentTooLongError";
import { Result } from "../../../../../../src/contexts/shared/domain/Result";
import { MockClock } from "../../../../shared/infrastructure/MockClock";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { UserIdMother } from "../../../users/domain/UserIdMother";
import { PostIdMother } from "../../domain/PostIdMother";
import { PostMother } from "../../domain/PostMother";
import { PostPublishedDomainEventMother } from "../../domain/PostPublishedDomainEventMother";
import { MockPostRepository } from "../../infrastructure/MockPostRepository";

describe("PostPublisher should", () => {
	const clock = new MockClock();
	const repository = new MockPostRepository();
	const eventBus = new MockEventBus();

	const postPublisher = new PostPublisher(clock, repository, eventBus);

	it("return an error publishing an empty post", async () => {
		const postId = PostIdMother.create();
		const userId = UserIdMother.create();

		const postContent = "";

		const expectedError = new PostContentIsEmptyError();

		expect(await postPublisher.publish(postId.value, userId.value, postContent)).toEqual(
			Result.error(expectedError),
		);
	});

	it("return an error publishing a too long post", async () => {
		const postId = PostIdMother.create();
		const userId = UserIdMother.create();

		const maxPostLength = 280;
		const postContent = faker.string.alpha({ length: maxPostLength + 1 });

		const expectedError = new PostContentTooLongError(postContent, maxPostLength);

		expect(await postPublisher.publish(postId.value, userId.value, postContent)).toEqual(
			Result.error(expectedError),
		);
	});

	it("publish a valid post", async () => {
		const expectedPost = PostMother.createNew();
		const expectedPostPrimitives = expectedPost.toPrimitives();

		const expectedDomainEvent = PostPublishedDomainEventMother.create(expectedPostPrimitives);

		clock.shouldGenerate(expectedPost.createdAt);
		repository.shouldSave(expectedPost);
		eventBus.shouldPublish([expectedDomainEvent]);

		expect(
			await postPublisher.publish(
				expectedPostPrimitives.id,
				expectedPostPrimitives.userId,
				expectedPostPrimitives.content,
			),
		).toEqual(Result.ok());
	});
});
