test:
	@./node_modules/.bin/mocha && echo "Eslint running" && eslint . --ignore-path .eslintignore\ && echo "Done."
 
dev:
	npm start
build:
	docker build -t hasantayyar/bitwala .
run:
	docker run -p 3000:3000 -d hasantayyar/bitwala

.PHONY: test run
