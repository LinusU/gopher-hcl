.PHONY: all

all: build.js

builder/transpiled.js: builder/gopherjs.Dockerfile builder/main.go
	docker build -t gopher-hcl-gopherjs -f builder/gopherjs.Dockerfile builder/
	docker run --rm gopher-hcl-gopherjs > builder/transpiled.js

build.js: builder/closure-compiler.Dockerfile builder/transpiled.js
	docker build -t gopher-hcl-closure-compiler -f builder/closure-compiler.Dockerfile builder/
	docker run --rm gopher-hcl-closure-compiler > build.js
