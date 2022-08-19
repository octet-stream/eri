/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true, // disable strict mode to avoid useEffect being called twice
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true
  }
}

module.exports = config
