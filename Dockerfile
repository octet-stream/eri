FROM node:22-alpine as base

RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm@8

FROM base as build

RUN mkdir -p /usr/src/eri
WORKDIR /usr/src/eri

COPY package.json /usr/src/eri/
COPY pnpm-lock.yaml /usr/src/eri/

RUN pnpm i --frozen-lockfile

COPY . /usr/src/eri/

RUN pnpm run build

FROM base as run

RUN mkdir -p /usr/opt/eri

COPY --from=build /usr/src/eri/build /usr/opt/eri/build/
COPY --from=build /usr/src/eri/package.json /usr/opt/eri/
COPY --from=build /usr/src/eri/pnpm-lock.yaml /usr/opt/eri/

WORKDIR /usr/opt/eri

RUN pnpm i -P --frozen-lockfile --ignore-scripts

EXPOSE 3000
CMD ["pnpm", "start"]
