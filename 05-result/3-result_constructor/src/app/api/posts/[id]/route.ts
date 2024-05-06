import { NextRequest } from "next/server";

import { PostFinder } from "../../../../contexts/rrss/posts/application/find/PostFinder";
import { PostPublisher } from "../../../../contexts/rrss/posts/application/publish/PostPublisher";
import { NullPostRepository } from "../../../../contexts/rrss/posts/infrastructure/NullPostRepository";
import { assertNever } from "../../../../contexts/shared/domain/assertNever";
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
		return (await publisher.publish(id, body.userId, body.content)).fold(
			() => HttpNextResponse.created(),
			(error) => {
				switch (error.type) {
					case "PostContentIsEmptyError":
					case "PostContentTooLongError":
						return HttpNextResponse.domainError(error, 400);
					default:
						assertNever(error);
				}
			},
		);
	} catch (error) {
		return HttpNextResponse.internalServerError();
	}
}

export async function GET(
	_request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	try {
		return (await finder.find(id)).fold(
			(post) => HttpNextResponse.json(post),
			(error) => HttpNextResponse.domainError(error, 404),
		);
	} catch (error) {
		return HttpNextResponse.internalServerError();
	}
}
