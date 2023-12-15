/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    typedRoutes: false, // TODO: Turn this on and refactor (some time in a future, surely will do that)
    serverMinification: false,
    serverComponentsExternalPackages: [
      "@mikro-orm/core",
      "@mikro-orm/mysql",
      "@mikro-orm/migrations",
      "@mikro-orm/seeder",
      "got"
    ],
  }
}

if (process.env.NEXT_RUNS_IN_DOCKER) {
  config.output = "standalone"
}

module.exports = config
