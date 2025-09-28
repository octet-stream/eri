import {ormContext} from "../server/contexts/orm.ts"

import type {Route} from "./+types/health.ts"

interface HealthCheckResponse {
  isHealthy: boolean
}

/**
 * Responses with health check status
 */
export const loader = async ({
  context
}: Route.LoaderArgs): Promise<HealthCheckResponse> => {
  const orm = context.get(ormContext)

  return {
    isHealthy: await orm.isConnected()
  }
}
