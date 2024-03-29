process.loadEnvFile(".env.development.local")

export default import("./config.js").then(({config}) => config)
