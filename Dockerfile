FROM node
LABEL MAINTAINER "Fellipe Garcias"

RUN npm install -g ganache-cli \
    truffle \
    @vue/cli