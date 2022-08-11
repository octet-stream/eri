FROM node:16

RUN curl -fsSL https://get.pnpm.io/install.sh | PNPM_VERSION=7.6 sh -

RUN mkdir -p /usr/src/eri
WORKDIR /usr/src/eri

COPY package.json /usr/src/eri
COPY pnpm-lock.yaml /usr/src/eri

RUN pnpm install

COPY . /usr/src/eri

RUN pnpm run build

CMD ["pnpm", "run", "start"]
