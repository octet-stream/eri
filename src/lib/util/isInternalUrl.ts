import isAbsolute from "is-absolute-url"

import {serverAddress} from "./serverAddress"

/**
 * Checks if given url string is external
 *
 * @param url
 */
export const isInternalUrl = (
  url: string
): boolean => isAbsolute(url) ? url.startsWith(serverAddress) : true
