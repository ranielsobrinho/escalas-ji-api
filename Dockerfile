FROM node:16
WORKDIR /usr/src/escalas_ji
COPY ./package.json ./
COPY prisma ./prisma/
COPY ./.env ./
RUN npm install
RUN npx prisma generate
