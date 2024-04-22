/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Primitives } from "@codelytv/primitives-type";

export abstract class DomainError {
	abstract errorName: string;

	abstract message(): string;

	toPrimitives(): Omit<Primitives<this>, "errorName"> {
		const props = Object.entries(this).filter(([key, _]) => key !== "errorName");

		return props.reduce((acc, [key, value]) => {
			return {
				...acc,
				[key]: value,
			};
		}, {}) as Omit<Primitives<this>, "errorName">;
	}
}
