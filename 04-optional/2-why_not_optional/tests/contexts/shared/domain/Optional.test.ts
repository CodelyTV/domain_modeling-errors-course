import { Optional } from "../../../../src/contexts/shared/domain/Optional";

describe("Optional should", () => {
	it("get an existing value value", () => {
		const optional = Optional.of(1);

		expect(optional.get()).toBe(1);
	});

	it("get other value if is not defined", () => {
		const optional = Optional.empty();

		expect(optional.orElse(1)).toBe(1);
	});

	it("map an existing value", () => {
		const optional = Optional.of(1);

		expect(optional.map((value) => value * 5).get()).toBe(5);
	});

	it("fold an existing value", () => {
		const optional = Optional.of(1);

		expect(
			optional.fold(
				() => 1,
				(value) => value * 5,
			),
		).toBe(5);
	});

	it("fold a non existing value", () => {
		const optional = emptyOptional();

		expect(
			optional.fold(
				() => 1,
				(value) => value * 5,
			),
		).toBe(1);
	});
});

function emptyOptional(): Optional<number> {
	return Optional.empty();
}
