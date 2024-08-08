# eri

Minimalistic open source blog engine.

This project built with [Remix](https://remix.run/), [Lucia](https://lucia-auth.com/), [Mikro ORM](https://mikro-orm.io/), [Tailwind](https://tailwindcss.com/docs) and [shadcn/ui](https://ui.shadcn.com/).

## Database schema setup

As the project is currently in prototyping stage, the only way to create database schema is to run `pnpm mikro-orm-esm schema:update -r` command.
This approach will be replaced with migrations.

## Environment variables

Eri automatically picks up `.env` files from one of this souces: `.env.<mode>.local`, `.env.<mode>`, `.env.local`, `.env` (where mode is the value of the `process.env.NODE_ENV`).
If none of these exists, then Eri will fallback to `process.env` object.

## Development setup

1. First of all, you'll need to install MySQL;
2. Then clone this repository `git clone git@github.com:octet-stream/eri.git`;
3. When it's done, install dependencies using `pnpm install` command;
4. Create either `.env.development.local` or `.env.local` and add required configuration;
5. Now you are able to run dev server. To do so, run `pnpm dev` command;
6. Open http://localhost:5173/admin and create admin account (if it doesn't exists).

## Production preview

1. Create either `.env.production.local` or `.env.local` and add required configuration;
2. To build the project, run `pnpm turbo build`
3. Once production build is finished, run `pnpm --filter eri start`
4. Open http://localhost:3000/admin and create admin account (if it doesn't exists).

## Demo

You can run demo application with non-persistent database in just a few steps:

1. Create `.env.demo.local` file and fill it with required parameters
2. Run `pnpm demo.start` command
3. Open http://localhost:1337/admin to create admin account

## Commands

List of available commands. These commands are accessible via pnpm.

| Name                | Description                                                     |
|---------------------|-----------------------------------------------------------------|
| `build`             | Builds project for production                                   |
| `start`             | Starts production server                                        |
| `dev`               | Starts Vite in dev mode                                         |
| `dev.open`          | Starts Vite in dev mode and opens app in user's default browser |
| `demo.start`        | Starts docker container with demo application                   |
| `demo.stop`         | Stops demo application and removed container                    |
| `lint:types`        | Runs `tsc` to validate TypeScript types                         |
| `test`              | Runs tests                                                      |
| `test.compose.up`   | Starts `docker compose` with database for integration tests     |
| `test.compose.down` | Stops `docker compose` for integration tests                    |
| `report`            | Prints coverage report for tests                                |
| `report.html`       | Outputs coverage report to html                                 |
| `ci`                | Runs tests for CI                                               |
