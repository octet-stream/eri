import {loadEnvConfig} from "@next/env"

export default loadEnvConfig(process.cwd(), process.env.NODE_ENV != "production")
