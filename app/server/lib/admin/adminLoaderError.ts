import {isRouteErrorResponse, type ErrorResponse} from "react-router"

export enum AdminLoaderErrorCode {
  SETUP = 0,
  LOGIN = 1
}

export interface AdminLoaderErrorData {
  type: "admin"
  code: AdminLoaderErrorCode
}

export interface AdminLoaderError extends ErrorResponse {
  data: AdminLoaderErrorData
}

/**
 * Checks if given `error` is of AdminLoaderError type
 */
export const isAdminLoaderError = (error: unknown): error is AdminLoaderError =>
  isRouteErrorResponse(error) &&
  typeof error.data === "object" &&
  error.data !== null &&
  !Array.isArray(error.data) &&
  error.data.type === "admin" &&
  "code" in error.data

/**
 * Creates admin loader error
 */
export function createAdminLoaderError(code: AdminLoaderErrorCode): never {
  throw Response.json({type: "admin", code} satisfies AdminLoaderErrorData, {
    status: code === AdminLoaderErrorCode.SETUP ? 404 : 403
  })
}
