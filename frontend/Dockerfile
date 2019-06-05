FROM node:10

# install simple http server for serving static content
RUN npm install -g http-server

WORKDIR /usr/src/app

COPY package*.json vue.config.js babel.config.js ./

RUN npm install

COPY . .

RUN npm run build

CMD http-server dist -p 3000