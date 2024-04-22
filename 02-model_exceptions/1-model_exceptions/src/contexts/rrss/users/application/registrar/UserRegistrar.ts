import { EventBus } from "../../../../shared/domain/event/EventBus";
import { LegacyUserRepository } from "../../domain/LegacyUserRepository";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UserRegistrar {
	constructor(
		private readonly legacyRepository: LegacyUserRepository,
		private readonly repository: UserRepository,
		private readonly eventBus: EventBus,
	) {}

	async registrar(id: string, name: string, email: string, profilePicture: string): Promise<void> {
		const user = User.create(id, name, email, profilePicture);

		await this.legacyRepository.save(user);
		await this.repository.save(user);

		await this.eventBus.publish(user.pullDomainEvents());
	}
}
