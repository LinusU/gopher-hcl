FROM golang:1.12

RUN go get github.com/gopherjs/gopherjs
RUN go get github.com/hashicorp/hcl

ADD main.go ./
RUN gopherjs build main.go -o build.js

CMD ["cat", "build.js"]
