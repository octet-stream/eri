/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: [
      "@mikro-orm/core",
      "@mikro-orm/mysql",
      "@mikro-orm/migrations",
      "@mikro-orm/seeder"
    ]
  }
}

if (process.env.NEXT_RUNS_IN_DOCKER) {
  config.output = "standalone"
}

module.exports = config
