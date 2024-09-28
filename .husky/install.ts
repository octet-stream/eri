// Disable husky for CI, production and if HUSKY set to "0"
if (
  process.env.NODE_ENV === "production" ||
  process.env.CI ||
  process.env.HUSKY === "0"
) {
  process.exit(0)
}

try {
  const {default: isInCi} = await import("is-in-ci")

  if (isInCi) {
    process.exit(0)
  }
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== "ERR_MODULE_NOT_FOUND") {
    throw error
  }

  console.info("Unable to detect whether the process is in CI, or container")
  console.info("Skipping to further step")
}

const {default: husky} = await import("husky")

husky()
console.info("Husky installed")

// So TS won't complain (even though I have force module detection enabled)
export {}
