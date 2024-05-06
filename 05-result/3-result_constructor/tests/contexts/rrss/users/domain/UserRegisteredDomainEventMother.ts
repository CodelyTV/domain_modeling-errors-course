import { Primitives } from "@codelytv/primitives-type";

import { User } from "../../../../../src/contexts/rrss/users/domain/User";
import { UserRegisteredDomainEvent } from "../../../../../src/contexts/rrss/users/domain/UserRegisteredDomainEvent";
import { UserStatus } from "../../../../../src/contexts/rrss/users/domain/UserStatus";
import { UserEmailMother } from "./UserEmailMother";
import { UserIdMother } from "./UserIdMother";
import { UserNameMother } from "./UserNameMother";
import { UserProfilePictureMother } from "./UserProfilePictureMother";

export class UserRegisteredDomainEventMother {
	static create(params?: Partial<Primitives<User>>): UserRegisteredDomainEvent {
		const primitives: Primitives<User> = {
			id: UserIdMother.create().value,
			name: UserNameMother.create().value,
			email: UserEmailMother.create().value,
			profilePicture: UserProfilePictureMother.create().value,
			status: UserStatus.Active,
			...params,
		};

		return new UserRegisteredDomainEvent(
			primitives.id,
			primitives.name,
			primitives.email,
			primitives.profilePicture,
			primitives.status as string,
		);
	}
}
