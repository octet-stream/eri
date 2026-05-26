interface AppEnvs {
  // Node.js
  readonly NODE_ENV: "production" | "development" | "test"

  /**
   * Name of the application (will be displayed as base title for pages)
   */
  readonly BLOG_NAME?: string

  /**
   * Cookies secret
   */
  readonly AUTH_SECRET: string

  /**
   * Cookies prefix
   */
  readonly AUTH_COOKIE_PREFIX?: string

  /**
   * Remote address for libSQL database.
   * 
   * Only `libsql://` scheme is supported.
   */
  readonly LIBSQL_DB_URL?: string

  /**
   * libSQL database name.
   * 
   * Can either be `libsql://` URL, or path to SQLite database file
   */
  readonly LIBSQL_DB_NAME?: string

  /**
   * Password for remote database connection (e. g. auth token)
   */
  readonly LIBSQL_DB_PASSWORD?: string

  /**
   * Port for HTTP server to listen on.
   * 
   * Note that the server always listens on `127.0.0.1` host, so use reverse-proxy to expose it to the internet
   */
  readonly PORT?: string
}

namespace NodeJS {
  interface ProcessEnv extends AppEnvs {}
}

interface ImportMetaEnv extends AppEnvs {}
