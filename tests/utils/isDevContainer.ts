import isInsideContainer from "is-inside-container"

/**
 * Checks if current process runs within devcontainer
 *
 * Note: This might need some improvents, because ccurrent sulution is relied on `REMOTE_CONTAINERS` env variable to be set + the result of `is-inside-container`.
 * This alone might not in practice mean that the process is indeed inside dev container.
 */
export const isDevContainer = (): boolean =>
  isInsideContainer() && !!process.env.REMOTE_CONTAINERS
