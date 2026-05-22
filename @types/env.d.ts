namespace NodeJS {
  interface ProcessEnv {
    // Node.js
    readonly NODE_ENV: "production" | "development" | "test"

    // App
    readonly BLOG_NAME?: string

    // Auth
    readonly AUTH_SECRET: string
    readonly AUTH_COOKIE_PREFIX?: string

    // libSQL
    readonly LIBSQL_DB_URL?: string
    readonly LIBSQL_DB_NAME?: string
    readonly LIBSQL_DB_PASSWORD?: string

    // Server
    readonly PORT?: string
  }
}
