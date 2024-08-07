import { NextResponse } from "next/server";

import { DomainError } from "../../domain/DomainError";

export class HttpNextResponse {
	static domainError(error: DomainError, statusCode: number): NextResponse {
		return NextResponse.json(
			{
				error: error.toPrimitives(),
			},
			{ status: statusCode },
		);
	}

	static internalServerError(): NextResponse {
		return NextResponse.json(
			{
				code: "InternalServerError",
				message: "Internal server error",
				data: {},
			},
			{ status: 500 },
		);
	}

	static created(): NextResponse {
		return new NextResponse(null, { status: 201 });
	}

	static json<JsonBody>(data: JsonBody): NextResponse {
		return NextResponse.json(data, { status: 200 });
	}
}
