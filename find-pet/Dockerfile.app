FROM node:alpine as base

EXPOSE 8080

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD npm run start