FROM node:18-alpine

WORKDIR /Backend

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install

COPY . . 

RUN npm install dotenv

EXPOSE 4001

CMD [ "node", "server.js"]