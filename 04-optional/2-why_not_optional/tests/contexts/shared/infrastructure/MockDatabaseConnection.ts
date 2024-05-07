import { jest } from "@jest/globals";

import { DatabaseConnection } from "../../../../src/contexts/shared/domain/DatabaseConnection";

export class MockDatabaseConnection extends DatabaseConnection {
	private readonly mockBeginTransaction = jest.fn();
	private readonly mockCommit = jest.fn();
	private readonly mockRollback = jest.fn();

	async beginTransaction(): Promise<void> {
		expect(this.mockBeginTransaction).toHaveBeenCalledWith();

		return Promise.resolve();
	}

	async commit(): Promise<void> {
		expect(this.mockCommit).toHaveBeenCalledWith();

		return Promise.resolve();
	}

	async execute(_query: string): Promise<void> {
		return Promise.resolve();
	}

	async rollback(): Promise<void> {
		expect(this.mockRollback).toHaveBeenCalledWith();

		return Promise.resolve();
	}

	async searchAll<T>(_query: string): Promise<T[]> {
		return Promise.resolve([]);
	}

	async searchOne<T>(_query: string): Promise<T | null> {
		return Promise.resolve(null);
	}

	async truncate(_table: string): Promise<void> {
		return Promise.resolve();
	}

	shouldBeginTransaction(): void {
		this.mockBeginTransaction();
	}

	shouldCommit(): void {
		this.mockCommit();
	}

	shouldRollback(): void {
		this.mockRollback();
	}
}
