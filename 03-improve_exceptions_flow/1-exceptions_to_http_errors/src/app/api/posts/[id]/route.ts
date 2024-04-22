import { NextRequest } from "next/server";

import { PostPublisher } from "../../../../contexts/rrss/posts/application/publish/PostPublisher";
import { PostContentIsEmptyError } from "../../../../contexts/rrss/posts/domain/PostContentIsEmptyError";
import { PostContentTooLongError } from "../../../../contexts/rrss/posts/domain/PostContentTooLongError";
import { NullPostRepository } from "../../../../contexts/rrss/posts/infrastructure/NullPostRepository";
import { DomainError } from "../../../../contexts/shared/domain/DomainError";
import { InMemoryEventBus } from "../../../../contexts/shared/infrastructure/bus/InMemoryEventBus";
import { DateClock } from "../../../../contexts/shared/infrastructure/DateClock";
import { HttpNextResponse } from "../../../../contexts/shared/infrastructure/http/HttpNextResponse";

const postPublisher = new PostPublisher(
	new DateClock(),
	new NullPostRepository(),
	new InMemoryEventBus([]),
);

export async function PUT(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	const body = (await request.json()) as { userId: string; content: string };

	try {
		await postPublisher.publish(id, body.userId, body.content);
	} catch (error: unknown) {
		if (error instanceof DomainError) {
			switch (error.constructor) {
				case PostContentIsEmptyError:
					return HttpNextResponse.domainError(error, 400);
				case PostContentTooLongError:
					return HttpNextResponse.domainError(error, 400);
			}
		}

		return HttpNextResponse.internalServerError();
	}

	return HttpNextResponse.created();
}
