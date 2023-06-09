FROM node:18

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma/schema.prisma ./prisma/
RUN pnpx prisma generate

COPY . .

RUN rimraf ./dist && swc ./src -d dist

EXPOSE 8080
CMD [ "pnpm", "start" ]