FROM node:20.10-alpine3.19 AS builder
RUN apk add git
WORKDIR /web
RUN git clone https://github.com/JoaquinCarrascal/PipocApp.git .
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --configuration production --aot

FROM nginx:alpine
WORKDIR /web
COPY --from=builder /web/dist/pipoc-app/* .
RUN mv ./* /usr/share/nginx/html/