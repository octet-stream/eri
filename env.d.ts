namespace NodeJS {
  interface Process {
    loadEnvFile(path: string): void
  }

  interface ProcessEnv {
    // Node.js
    readonly NODE_ENV: "production" | "development" | "test"

    // App
    readonly BLOG_NAME?: string

    // Auth
    readonly AUTH_SECRET: string

    // Database
    readonly DB_NAME: string
    readonly DB_HOST?: string
    readonly DB_PORT?: string
    readonly DB_USER: string
    readonly DB_PASSWORD: string

    // Server
    readonly PORT?: string
  }
}
