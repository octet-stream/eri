import type {Config} from "@react-router/dev/config"

declare module "react-router" {
  interface Future {
    unstable_middleware: true
  }
}

export default {
  future: {
    unstable_optimizeDeps: true,
    unstable_splitRouteModules: true,
    unstable_viteEnvironmentApi: true,
    unstable_middleware: true
  }
} satisfies Config
