namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_SERVER_URL: string

    readonly NEXTAUTH_URL: string
    readonly NEXTAUTH_SECRET: string

    readonly MIKRO_ORM_DB_NAME: string
    readonly MIKRO_ORM_HOST?: string
    readonly MIKRO_ORM_PORT?: string
    readonly MIKRO_ORM_USER: string
    readonly MIKRO_ORM_PASSWORD: string
  }
}
