/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export abstract class DomainError extends Error {
	protected constructor(
		public readonly type: string,
		private readonly description: string,
		private readonly data: Record<string, unknown> = {},
	) {
		super(description);
	}

	toPrimitives(): { type: string; description: string; data: Record<string, unknown> } {
		return {
			type: this.type,
			description: this.description,
			data: this.data,
		};
	}
}
