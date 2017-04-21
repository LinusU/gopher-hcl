FROM openjdk:8u121-jre-alpine

RUN apk add --no-cache curl
RUN curl -L http://dl.google.com/closure-compiler/compiler-20170409.tar.gz | tar xz

ADD transpiled.js transpiled.js
CMD java -jar closure-compiler-v20170409.jar --js transpiled.js --language_in ECMASCRIPT5_STRICT --language_out ECMASCRIPT5_STRICT --jscomp_off '*'
