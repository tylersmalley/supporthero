WEBPACK_BIN=node_modules/.bin/webpack

default: install watch

install:
	@npm install

clean:
	@rm -rf node_modules
	@rm -rf public/bundle

build: install
	@NODE_ENV=production ${WEBPACK_BIN}

server:
	@node index.js

watch:
	@${WEBPACK_BIN} -d --progress --colors --watch

.PHONY: default install clean build server watch
