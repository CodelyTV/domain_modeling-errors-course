import { CodelyError } from "../../../../src/contexts/shared/domain/CodelyError";

class TestDomainError extends CodelyError {
	readonly message = "TestDomainError";

	constructor(stringProp: string, numberProp: number) {
		super({ stringProp, numberProp });
	}
}

describe("Domain Error", () => {
	it("return primitive props with toPrimitives method", () => {
		const domainError = new TestDomainError("stringProp", 50);

		expect(domainError.toPrimitives()).toEqual({
			message: "TestDomainError",
			params: {
				stringProp: "stringProp",
				numberProp: 50,
			},
		});
	});
});
