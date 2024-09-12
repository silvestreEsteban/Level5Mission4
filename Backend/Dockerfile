FROM node:18-alpine

WORKDIR /Backend

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install

COPY . . 

EXPOSE 8081

CMD [ "node", "server.js"]