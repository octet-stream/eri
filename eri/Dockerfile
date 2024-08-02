FROM node:22-alpine as base

RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
COPY . /usr/src/eri
WORKDIR /usr/src/eri

FROM base as deps-prod

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --prod --frozen-lockfile

FROM base as deps-dev

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile

FROM base as build

COPY --from=deps-dev /usr/src/eri/node_modules /usr/src/eri/node_modules

RUN pnpm build

FROM base as run

RUN mkdir -p /usr/opt/eri

COPY --from=build /usr/src/eri/build /usr/opt/eri/build
COPY --from=build /usr/src/eri/package.json /usr/opt/eri/
COPY --from=deps-prod /usr/src/eri/node_modules /usr/opt/eri/node_modules

WORKDIR /usr/opt/eri

EXPOSE 3000
CMD ["pnpm", "start"]
