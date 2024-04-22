import { MariaDBConnection } from "../../../shared/infrastructure/MariaDBConnection";
import { LegacyUserRepository } from "../domain/LegacyUserRepository";
import { User } from "../domain/User";

export class MySqlLegacyUserRepository implements LegacyUserRepository {
	constructor(private readonly connection: MariaDBConnection) {}

	async save(user: User): Promise<void> {
		const userPrimitives = user.toPrimitives();

		const query = `INSERT INTO legacy__users (id, name) VALUES ('${userPrimitives.id}', '${userPrimitives.name}');`;

		await this.connection.execute(query);
	}
}
