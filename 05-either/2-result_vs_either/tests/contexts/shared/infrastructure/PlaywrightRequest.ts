import type { APIRequestContext, APIResponse } from "playwright-core";

interface PlaywrightRequestHandler {
	put: (path: string, body: Record<string, unknown>) => Promise<APIResponse>;
}

export function PlaywrightRequest(request: APIRequestContext): PlaywrightRequestHandler {
	return {
		async put(path: string, body: Record<string, unknown>): Promise<APIResponse> {
			return await request.put(`http://localhost:3000${path}`, {
				data: body,
				headers: {
					"Content-Type": "application/json",
				},
			});
		},
	};
}
