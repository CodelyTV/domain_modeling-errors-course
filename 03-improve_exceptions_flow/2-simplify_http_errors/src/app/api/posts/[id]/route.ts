import { NextRequest } from "next/server";

import { PostFinder } from "../../../../contexts/rrss/posts/application/find/PostFinder";
import { PostPublisher } from "../../../../contexts/rrss/posts/application/publish/PostPublisher";
import { PostContentIsEmptyError } from "../../../../contexts/rrss/posts/domain/PostContentIsEmptyError";
import { PostContentTooLongError } from "../../../../contexts/rrss/posts/domain/PostContentTooLongError";
import { PostDoesNotExistError } from "../../../../contexts/rrss/posts/domain/PostDoesNotExistError";
import { NullPostRepository } from "../../../../contexts/rrss/posts/infrastructure/NullPostRepository";
import { DomainError } from "../../../../contexts/shared/domain/DomainError";
import { InMemoryEventBus } from "../../../../contexts/shared/infrastructure/bus/InMemoryEventBus";
import { DateClock } from "../../../../contexts/shared/infrastructure/DateClock";
import { executeWithErrorHandling } from "../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HttpNextResponse } from "../../../../contexts/shared/infrastructure/http/HttpNextResponse";

const repository = new NullPostRepository();

const publisher = new PostPublisher(new DateClock(), repository, new InMemoryEventBus([]));
const finder = new PostFinder(repository);

export async function PUT(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	const body = (await request.json()) as { userId: string; content: string };

	return executeWithErrorHandling(
		async () => {
			await publisher.publish(id, body.userId, body.content);

			return HttpNextResponse.created();
		},
		(error: DomainError) => {
			switch (error.constructor) {
				case PostContentIsEmptyError:
				case PostContentTooLongError:
					return HttpNextResponse.domainError(error, 400);
			}
		},
	);
}

export async function GET(
	_request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	return executeWithErrorHandling(
		async () => {
			const post = await finder.find(id);

			return HttpNextResponse.json(post);
		},
		(error: DomainError) => {
			if (error.constructor === PostDoesNotExistError) {
				return HttpNextResponse.domainError(error, 404);
			}
		},
	);
}
