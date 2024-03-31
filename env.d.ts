namespace NodeJS {
  interface Process {
    loadEnvFile(path: string): void
  }

  interface ProcessEnv {
    readonly NODE_ENV: "production" | "development" | "test"
    readonly BLOG_NAME?: string

    readonly NEXT_PUBLIC_SERVER_URL: string

    readonly NEXTAUTH_URL: string
    readonly NEXTAUTH_SECRET: string

    readonly DB_NAME: string
    readonly DB_HOST?: string
    readonly DB_PORT?: string
    readonly DB_USER: string
    readonly DB_PASSWORD: string
  }
}
