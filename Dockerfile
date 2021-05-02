FROM node:14

RUN npm install pm2 -g

COPY package*.json ./
RUN npm install

COPY . .

RUN pm2 start index.js --name "discordBot"