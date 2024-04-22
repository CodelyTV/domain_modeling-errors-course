import { NextResponse } from "next/server";

import { DomainError } from "../../domain/DomainError";
import { HttpNextResponse } from "./HttpNextResponse";

export async function executeWithErrorHandling(
	fn: () => Promise<NextResponse>,
	onError: (error: DomainError) => NextResponse | void = () => undefined,
): Promise<NextResponse> {
	try {
		return await fn();
	} catch (error: unknown) {
		if (error instanceof DomainError) {
			const response = onError(error);

			if (response) {
				return response;
			}
		}

		return HttpNextResponse.internalServerError();
	}
}
