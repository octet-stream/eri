FROM node:14-alpine

RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.22.10

RUN mkdir -p /usr/src/eri/nicel
WORKDIR /usr/src/eri/nicel

COPY package.json /usr/src/eri/nicel
COPY yarn.lock /usr/src/eri/nicel

RUN yarn install

COPY . /usr/src/eri/nicel

RUN yarn build

EXPOSE 1340
CMD ["yarn", "start", "-p", "1340"]
