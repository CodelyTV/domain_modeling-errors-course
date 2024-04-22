import { LegacyUserRepository } from "../../../../../src/contexts/rrss/users/domain/LegacyUserRepository";
import { User } from "../../../../../src/contexts/rrss/users/domain/User";

export class MockLegacyUserRepository implements LegacyUserRepository {
	private readonly mockSave = jest.fn();
	private withError = false;

	async save(user: User): Promise<void> {
		expect(this.mockSave).toHaveBeenCalledWith(user.toPrimitives());

		if (this.withError) {
			this.withError = false;
			throw new Error("Error saving user in mock legacy user repository");
		}

		return Promise.resolve();
	}

	shouldSave(user: User): void {
		this.mockSave(user.toPrimitives());
	}

	shouldThrowErrorSaving(user: User): void {
		this.mockSave(user.toPrimitives());
		this.withError = true;
	}
}
