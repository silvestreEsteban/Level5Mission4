FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3001

CMD [ "serve", "-s", "dist" ]