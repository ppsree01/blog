FROM node:16.13.1

WORKDIR /app

COPY . .
RUN npm i -s
RUN npm run build
CMD npm run start