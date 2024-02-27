
ARG NODE_VERSION=18.17.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD npm run dev

