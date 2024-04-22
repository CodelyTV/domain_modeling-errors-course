import { createPool, Pool, SqlError } from "mariadb";

import { DatabaseConnection } from "../domain/DatabaseConnection";
import { TooManyMariaDbConnectionsException } from "./TooManyMariaDbConnectionsException";

interface MinimalConnection {
	query: (sql: string) => Promise<unknown>;
	beginTransaction: () => Promise<void>;
	commit: () => Promise<void>;
	rollback: () => Promise<void>;
	end: () => Promise<void>;
}

export class MariaDBConnection extends DatabaseConnection {
	private poolInstance: Pool | null = null;
	private connection: MinimalConnection | null = null;

	private get pool(): Pool {
		if (!this.poolInstance) {
			this.poolInstance = createPool({
				host: "localhost",
				user: "codely",
				password: "c0d3ly7v",
				database: "ecommerce",
			});
		}

		return this.poolInstance;
	}

	async searchOne<T>(query: string): Promise<T | null> {
		try {
			const conn = await this.getConnection();
			const rows = (await conn.query(query)) as T[];

			return rows[0] ?? null;
		} catch (error) {
			if (error instanceof SqlError) {
				if (error.errno === 8004) {
					throw new TooManyMariaDbConnectionsException();
				}
			}
		}

		return null;
	}

	async searchAll<T>(query: string): Promise<T[]> {
		const conn = await this.getConnection();

		return (await conn.query(query)) as T[];
	}

	async execute(query: string): Promise<void> {
		const conn = await this.getConnection();
		await conn.query(query);
	}

	async truncate(table: string): Promise<void> {
		await this.execute(`TRUNCATE TABLE ${table}`);
	}

	async beginTransaction(): Promise<void> {
		this.connection = await this.getConnection();

		await this.connection.beginTransaction();
	}

	async commit(): Promise<void> {
		await this.connection?.commit();
	}

	async rollback(): Promise<void> {
		await this.connection?.rollback();
	}

	async close(): Promise<void> {
		if (this.poolInstance !== null) {
			await this.pool.end();
		}
	}

	private async getConnection(): Promise<MinimalConnection> {
		if (!this.connection) {
			this.connection = (await this.pool.getConnection()) as MinimalConnection;
		}

		return this.connection;
	}
}
