FROM node:18-alpine

EXPOSE 4000

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . .

CMD ["npm", "run", "start:dev"]