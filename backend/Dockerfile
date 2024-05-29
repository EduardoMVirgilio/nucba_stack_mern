FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./

FROM base AS build

RUN npm ci --production

FROM build AS production

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
