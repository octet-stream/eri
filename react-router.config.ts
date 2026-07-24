import type {Config} from "@react-router/dev/config"

declare module "react-router" {
  interface Future {
    v8_middleware: true
  }
}

export default {
  subResourceIntegrity: true,
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    unstable_optimizeDeps: true
  }
} satisfies Config
