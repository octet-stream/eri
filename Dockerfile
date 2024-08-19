FROM node:22-alpine as base

RUN apk add --no-cache libc6-compat

# Set up pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set pwd for all further steps
WORKDIR /usr/src/eri

# Prepare repository for eri
FROM base as repo
COPY . .

# Prepare dependencies installation
FROM base as deps-common
COPY --from=repo /usr/src/eri/package.json .
COPY --from=repo /usr/src/eri/pnpm-lock.yaml .

# Prepare production-only dependencies
FROM deps-common as deps-prod
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --prod --frozen-lockfile --prefer-offline --ignore-scripts

# Prepare development-only
FROM deps-common as deps-dev
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile --prefer-offline

FROM base as build
COPY --from=repo /usr/src/eri/ .
COPY --from=deps-dev /usr/src/eri/ .

RUN pnpm build

FROM base as dist

WORKDIR /usr/opt/eri

COPY --from=build /usr/src/eri/build build
COPY --from=build /usr/src/eri/package.json package.json
COPY --from=deps-prod /usr/src/eri/node_modules node_modules

EXPOSE 3000
CMD ["node", "--run", "start"]
