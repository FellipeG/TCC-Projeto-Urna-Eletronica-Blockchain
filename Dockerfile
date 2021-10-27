FROM node:14-alpine
LABEL MAINTAINER "Fellipe Garcias"

RUN npm install -g ganache-cli@6.12.2 \
    truffle@5.4.16 \
    @vue/cli@4.5.14