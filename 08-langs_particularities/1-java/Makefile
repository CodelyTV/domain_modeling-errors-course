all: build

.PHONY: build
build:
	@./gradlew assemble --warning-mode all

.PHONY: test
test:
	@./gradlew check --warning-mode all

static-analysis:
	@./gradlew rewriteRun
