MOCHA_REPORTER = spec
UNIT_TESTS = $(shell find test/ -name "*.test.js")


all: spec

spec:
	clear
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--globals prop \
		--reporter $(MOCHA_REPORTER) \
		--slow 50 \
		--growl \
		$(UNIT_TESTS)


.PHONY: spec