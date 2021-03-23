/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly SERVER_PORT: string
    readonly SERVER_ADRESS: string
    readonly CLIENT_ADDRESS: string
    readonly DB_DIALECT: "mysql" | "postgres" | "sqlite"
    readonly DB_HOST: string
    readonly DB_USER: string
    readonly DB_PASSWORD: string
    readonly DB_NAME: string
    readonly AUTH_SESSION_SECRET: string
  }
}
