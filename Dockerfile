
FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
