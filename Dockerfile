FROM node:22-alpine as base

RUN apk add --no-cache libc6-compat

# Set paths for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install pnpm and Turborepo
RUN corepack enable

# Set pwd for all further steps
WORKDIR /usr/src/eri

# Prepare repository for eri
FROM base as repo
RUN pnpm add -g turbo
COPY . .
RUN turbo prune eri --docker

# Prepare dependencies installation
FROM base as deps-common
COPY --from=repo /usr/src/eri/out/json/ .

# Prepare production-only dependencies
FROM deps-common as deps-prod
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --prod --frozen-lockfile --prefer-offline --ignore-scripts

# Prepare development-only
FROM deps-common as deps-dev
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile --prefer-offline

FROM base as build
COPY --from=deps-dev /usr/src/eri/ .
COPY --from=repo /usr/src/eri/out/full/ .

# These weren't copied by `turbo prune`
COPY tsconfig.json tsconfig.json
COPY biome.jsonc biome.jsonc

RUN pnpm turbo build --filter=eri

FROM base as dist

WORKDIR /usr/opt/eri

COPY --from=build /usr/src/eri/apps/eri/build apps/eri/build
COPY --from=build /usr/src/eri/apps/eri/package.json apps/eri/package.json
COPY --from=deps-prod /usr/src/eri/apps/eri/node_modules apps/eri/node_modules
COPY --from=deps-prod /usr/src/eri/node_modules node_modules
COPY --from=deps-prod /usr/src/eri/pnpm-workspace.yaml pnpm-workspace.yaml
COPY apps/eri/tsconfig.json apps/eri/tsconfig.json
COPY tsconfig.json tsconfig.json
COPY license license

EXPOSE 3000
CMD ["pnpm", "--filter", "eri", "start"]
