# eri

Minimalistic open source blog engine.

This project built with [React Router](https://reactrouter.com/), [Hono](https://hono.dev), [Mikro ORM](https://mikro-orm.io/), [Better Auth](https://www.better-auth.com/), [Tailwind CSS](https://tailwindcss.com/docs) and [shadcn/ui](https://ui.shadcn.com/).

## Database schema setup

As the project is currently in prototyping stage, the only way to create database schema is to run `pnpm mikro-orm-esm schema:update -r` command.
This approach will be replaced with migrations.

## Environment variables

Eri automatically picks up `.env` files from one of this souces: `.env.<mode>.local`, `.env.<mode>`, `.env.local`, `.env` (where mode is the value of the `process.env.NODE_ENV`).
If none of these exists, then Eri will fallback to `process.env` object.

## Development setup

There's two ways to set up the project for local development: You can either install dependencies manually on your machine, or you can use Devcontainers

### Manual setup

1. First of all, you'll need to install MariaDB;
2. Then clone this repository `git clone git@github.com:octet-stream/eri.git`;
3. When it's done, install dependencies using `pnpm install` command;
4. Create either `.env.development.local` or `.env.local` and add required configuration;
5. Now you are able to run dev server. To do so, run `pnpm dev` command;
6. Open http://localhost:5173/admin and create admin account (if it doesn't exists).

### Devcontainers

1. Install [Devcontainers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension to your VSCode
2. Once you've installed, you'll be prompted to "Reopen the folter in a container" or you can clone the repository in Docker volume for [better I/O performance](https://code.visualstudio.com/docs/devcontainers/containers#_quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume). If you're not prompted, then open command palette and choose "Dev Containers: Open Folder in Container" command.

Alternatively you can use [Devcontainers CLI](https://github.com/devcontainers/cli). For that you'll need:

1. Install the CLI;
2. Open the project's root in your terminal;
3. Run the `devcontainer up --workspace-folder .` command. This will spin up a docker container for local development. Note that to install dependencies and run npm scripts (via pnpm) you'll need to use Devcontainer CLI.

Check out VSCode documentation to learn more: https://code.visualstudio.com/docs/devcontainers/containers

## Production preview

1. Create either `.env.production.local` or `.env.local` and add required configuration;
2. To build the project, run `pnpm turbo build`
3. Once production build is finished, run `pnpm start`
4. Open http://localhost:3000/admin and create admin account (if it doesn't exists).

## Demo

You can run demo application with non-persistent database in just a few steps:

1. Create `.env.demo.local` file and fill it with required parameters
2. Run `pnpm demo.start` command
3. Open http://localhost:3000/admin to create admin account

Note that the demo lives in-memory, so when use stop it via `pnpm demo.stop` command you'll loose the data from this demo.

## Commands

List of available commands. These commands are accessible via pnpm.

| Name                | Description                                                                                                                 |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------|
| `build`             | Builds project for production                                                                                               |
| `start`             | Starts production server                                                                                                    |
| `dev`               | Starts Vite in dev mode                                                                                                     |
| `dev.open`          | Starts Vite in dev mode and opens app in user's default browser                                                             |
| `demo.start`        | Starts docker container with demo application. If you want to rebuild the app's image, run this command with `--build` flag |
| `demo.stop`         | Stops demo application and removed container                                                                                |
| `lint.types`        | Runs `tsc` to validate TypeScript types                                                                                     |
