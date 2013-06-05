MOCHA_REPORTER = spec
UNIT_TESTS = $(shell find test/ -name "*.test.js")



test:
	clear
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--globals prop \
		--reporter $(MOCHA_REPORTER) \
		--slow 50 \
		--growl \
		$(UNIT_TESTS)


.PHONY: test