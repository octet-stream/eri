import type {Config} from "@react-router/dev/config"

export default {
  future: {
    v8_middleware: true,
    unstable_optimizeDeps: true,
    unstable_splitRouteModules: true,
    unstable_viteEnvironmentApi: true,
    unstable_subResourceIntegrity: true
  }
} satisfies Config
