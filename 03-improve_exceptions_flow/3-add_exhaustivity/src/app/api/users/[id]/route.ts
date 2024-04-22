import { NextRequest } from "next/server";

import { UserFinder } from "../../../../contexts/rrss/users/application/find/UserFinder";
import { UserRegistrar } from "../../../../contexts/rrss/users/application/registrar/UserRegistrar";
import { UserDoesNotExistError } from "../../../../contexts/rrss/users/domain/UserDoesNotExistError";
import { NullUserRepository } from "../../../../contexts/rrss/users/infrastructure/NullUserRepository";
import { InMemoryEventBus } from "../../../../contexts/shared/infrastructure/bus/InMemoryEventBus";
import { executeWithErrorHandling } from "../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HttpNextResponse } from "../../../../contexts/shared/infrastructure/http/HttpNextResponse";

const repository = new NullUserRepository();

const registrar = new UserRegistrar(repository, new InMemoryEventBus([]));
const finder = new UserFinder(repository);

export async function PUT(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	const body = (await request.json()) as { name: string; email: string; profilePicture: string };

	return executeWithErrorHandling(async () => {
		await registrar.registrar(id, body.name, body.email, body.profilePicture);

		return HttpNextResponse.created();
	});
}

export async function GET(
	_request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	return executeWithErrorHandling(
		async () => {
			const user = await finder.find(id);

			return HttpNextResponse.json(user);
		},
		(error: UserDoesNotExistError) => {
			return HttpNextResponse.domainError(error, 404);
		},
	);
}
