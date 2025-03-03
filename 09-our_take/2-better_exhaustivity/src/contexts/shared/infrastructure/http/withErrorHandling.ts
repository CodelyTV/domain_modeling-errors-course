import { NextRequest } from "next/server";

import { DomainError } from "../../domain/DomainError";
import { HttpNextResponse } from "./HttpNextResponse";

export function withErrorHandling<T extends DomainError, P = unknown>(
	fn: (request: NextRequest, params: P) => Promise<Response>,
	onError: (error: T) => Response | void = () => undefined,
) {
	return async function (request: NextRequest, params: P): Promise<Response> {
		try {
			return await fn(request, params);
		} catch (error: unknown) {
			if (error instanceof DomainError) {
				const response = onError(error as T);

				if (response) {
					return response;
				}
			}

			return HttpNextResponse.internalServerError();
		}
	};
}
