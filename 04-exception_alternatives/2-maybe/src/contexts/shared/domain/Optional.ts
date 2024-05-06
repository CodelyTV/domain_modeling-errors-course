export class Optional<T> {
	private constructor(private readonly value: T) {}

	static of<T>(value: T): Optional<T> {
		return new Optional(value);
	}

	static empty(): Optional<null> {
		return new Optional(null);
	}

	get(): T {
		return this.value;
	}

	map<R>(mapper: (value: T) => R): Optional<R | null> {
		return this.isPresent() ? Optional.of(mapper(this.value)) : Optional.empty();
	}

	isPresent(): boolean {
		return this.value !== null;
	}

	isEmpty(): boolean {
		return !this.isPresent();
	}

	orElse(other: T): T {
		return this.isPresent() ? this.value : other;
	}

	orElseThrow(error: Error): T {
		if (this.isPresent()) {
			return this.value;
		}

		throw error;
	}
}
