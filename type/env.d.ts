/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly DB_DIALECT: "mysql" | "postgres" | "sqlite"
    readonly DB_HOST: string
    readonly DB_USER: string
    readonly DB_PASSWORD: string
    readonly DB_NAME: string
  }
}
