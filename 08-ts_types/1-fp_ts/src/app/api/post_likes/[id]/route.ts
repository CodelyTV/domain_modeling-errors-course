import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { NextRequest } from "next/server";

import { PostLiker } from "../../../../contexts/rrss/post_likes/application/like/PostLiker";
import { NullPostLikeRepository } from "../../../../contexts/rrss/post_likes/infrastructure/NullPostLikeRepository";
import { PostFinder } from "../../../../contexts/rrss/posts/application/find/PostFinder";
import { NullPostRepository } from "../../../../contexts/rrss/posts/infrastructure/NullPostRepository";
import { UserFinder } from "../../../../contexts/rrss/users/application/find/UserFinder";
import { NullUserRepository } from "../../../../contexts/rrss/users/infrastructure/NullUserRepository";
import { assertNever } from "../../../../contexts/shared/domain/assertNever";
import { InMemoryEventBus } from "../../../../contexts/shared/infrastructure/bus/InMemoryEventBus";
import { DateClock } from "../../../../contexts/shared/infrastructure/DateClock";
import { HttpNextResponse } from "../../../../contexts/shared/infrastructure/http/HttpNextResponse";

const postLiker = new PostLiker(
	new PostFinder(new NullPostRepository()),
	new UserFinder(new NullUserRepository()),
	new DateClock(),
	new NullPostLikeRepository(),
	new InMemoryEventBus([]),
);

export async function PUT(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	const body = (await request.json()) as { postId: string; likerUserId: string };

	try {
		return pipe(
			postLiker.like(id, body.postId, body.likerUserId),
			E.fold(
				(error) => {
					switch (error.type) {
						case "PostDoesNotExistError":
						case "UserDoesNotExistError":
							return HttpNextResponse.domainError(error, 409);
						default:
							assertNever(error);
					}
				},
				() => HttpNextResponse.created(),
			),
		);
	} catch (error) {
		return HttpNextResponse.internalServerError();
	}
}
