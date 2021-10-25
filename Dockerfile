FROM node:12

COPY . .

RUN yarn
CMD ["yarn", "start"]
