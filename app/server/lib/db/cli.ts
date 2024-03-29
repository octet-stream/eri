// TODO: Improve env loading
process.loadEnvFile(`.env.${process.env.NODE_ENV || "development"}.local`)

export default import("./config.js").then(({config}) => config)
