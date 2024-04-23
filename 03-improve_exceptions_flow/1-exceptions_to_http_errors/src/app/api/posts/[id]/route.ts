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
import { HttpNextResponse } from "../../../../contexts/shared/infrastructure/http/HttpNextResponse";

const repository = new NullPostRepository();

const publisher = new PostPublisher(new DateClock(), repository, new InMemoryEventBus([]));
const finder = new PostFinder(repository);

export async function PUT(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	const body = (await request.json()) as { userId: string; content: string };

	try {
		await publisher.publish(id, body.userId, body.content);
	} catch (error: unknown) {
		if (error instanceof DomainError) {
			switch (error.constructor) {
				case PostContentIsEmptyError:
				case PostContentTooLongError:
					return HttpNextResponse.domainError(error, 400);
			}
		}

		return HttpNextResponse.internalServerError();
	}

	return HttpNextResponse.created();
}

export async function GET(
	_request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	try {
		const post = await finder.find(id);

		return HttpNextResponse.json(post);
	} catch (error: unknown) {
		if (error instanceof DomainError) {
			switch (error.constructor) {
				case PostDoesNotExistError:
					return HttpNextResponse.domainError(error, 404);
			}
		}

		return HttpNextResponse.internalServerError();
	}
}
