FROM docker:dind-18.09
RUN apk update & apk add nodejs
WORKDIR /usr/src/app
COPY package.json .
RUN npm i
COPY . .
RUN /usr/bin/dockerd-entrypoint.sh
CMD node index.js