import { NextRequest } from "next/server";

import { PostLiker } from "../../../../contexts/rrss/post_likes/application/like/PostLiker";
import { NullPostLikeRepository } from "../../../../contexts/rrss/post_likes/infrastructure/NullPostLikeRepository";
import { PostFinder } from "../../../../contexts/rrss/posts/application/find/PostFinder";
import { PostDoesNotExistError } from "../../../../contexts/rrss/posts/domain/PostDoesNotExistError";
import { NullPostRepository } from "../../../../contexts/rrss/posts/infrastructure/NullPostRepository";
import { UserFinder } from "../../../../contexts/rrss/users/application/find/UserFinder";
import { UserDoesNotExistError } from "../../../../contexts/rrss/users/domain/UserDoesNotExistError";
import { NullUserRepository } from "../../../../contexts/rrss/users/infrastructure/NullUserRepository";
import { DomainError } from "../../../../contexts/shared/domain/DomainError";
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
		await postLiker.like(id, body.postId, body.likerUserId);
	} catch (error: unknown) {
		if (error instanceof DomainError) {
			switch (error.constructor) {
				case PostDoesNotExistError:
				case UserDoesNotExistError:
					return HttpNextResponse.domainError(error, 409);
			}
		}

		return HttpNextResponse.internalServerError();
	}

	return HttpNextResponse.created();
}
