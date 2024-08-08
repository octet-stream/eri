import {defineConfig} from "vite"

export default defineConfig({
  build: {
    target: "esnext",
    outDir: "build/db",
    ssr: true,
    copyPublicDir: false,
    lib: {
      formats: ["es"],
      entry: {
        "mikro-orm.config": "app/server/lib/db/configs/prod.ts"
      }
    }
  }
})
