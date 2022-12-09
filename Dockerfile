
#FROM node:16.17.0-alpine AS builder
FROM node:latest as builder

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

#CMD ["npm" , "start"]

FROM nginx:alpine

COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf/default.conf
COPY --from=builder app/dist/csv-files-frontend usr/share/nginx/html

