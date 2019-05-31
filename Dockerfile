FROM node:11-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm i
COPY . .
CMD node index.js