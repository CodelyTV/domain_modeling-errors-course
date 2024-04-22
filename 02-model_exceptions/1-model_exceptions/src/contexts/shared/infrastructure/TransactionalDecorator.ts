/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return */
import { DatabaseConnection } from "../domain/DatabaseConnection";

export class TransactionalDecorator {
	static decorate<T>(decorated: T, connection: DatabaseConnection): T {
		// @ts-ignore
		return new Proxy(decorated, {
			get: (target, propKey, receiver) => {
				// @ts-ignore
				const originalMethod = target[propKey];
				if (typeof originalMethod === "function") {
					return async (...args: any[]) => {
						try {
							await connection.beginTransaction();
							const result = await originalMethod.apply(target, args);
							await connection.commit();

							return result;
						} catch (error) {
							await connection.rollback();
							throw error;
						}
					};
				}

				return originalMethod;
			},
		});
	}
}
