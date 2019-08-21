FROM golang:1.12

ADD main.go ./
RUN go get -d ./

RUN go get github.com/gopherjs/gopherjs
RUN gopherjs build main.go -o build.js

CMD ["cat", "build.js"]
