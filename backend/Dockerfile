FROM node:20-alpine3.17

WORKDIR /app

COPY package* ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && node dist/index.js"