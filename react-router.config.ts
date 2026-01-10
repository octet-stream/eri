import type {Config} from "@react-router/dev/config"

export default {
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    unstable_optimizeDeps: true,
    unstable_subResourceIntegrity: true
  }
} satisfies Config
