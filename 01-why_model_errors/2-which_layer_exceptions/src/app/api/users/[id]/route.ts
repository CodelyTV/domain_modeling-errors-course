import { NextRequest } from "next/server";

import { UserRegistrar } from "../../../../contexts/rrss/users/application/registrar/UserRegistrar";
import { MySqlLegacyUserRepository } from "../../../../contexts/rrss/users/infrastructure/MySqlLegacyUserRepository";
import { MySqlUserRepository } from "../../../../contexts/rrss/users/infrastructure/MySqlUserRepository";
import { InMemoryEventBus } from "../../../../contexts/shared/infrastructure/bus/InMemoryEventBus";
import { MariaDBConnection } from "../../../../contexts/shared/infrastructure/MariaDBConnection";
import { TransactionalDecorator } from "../../../../contexts/shared/infrastructure/TransactionalDecorator";

const connection = new MariaDBConnection();
const registrar = TransactionalDecorator.decorate(
	new UserRegistrar(
		new MySqlLegacyUserRepository(connection),
		new MySqlUserRepository(connection),
		new InMemoryEventBus([]),
	),
	connection,
);

export async function PUT(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	const body = (await request.json()) as { name: string; email: string; profilePicture: string };

	await registrar.registrar(id, body.name, body.email, body.profilePicture);

	return new Response("", { status: 201 });
}
