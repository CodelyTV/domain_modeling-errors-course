type CodelyErrorPrimitives = { message: string; params: Record<string, unknown> };

export abstract class CodelyError extends Error {
	constructor(public readonly params: Record<string, unknown> = {}) {
		super();
	}

	abstract override get message(): string;

	toPrimitives(): CodelyErrorPrimitives {
		return {
			message: this.message,
			params: this.params,
		};
	}
}
