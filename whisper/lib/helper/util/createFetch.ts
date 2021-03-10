import {IncomingMessage} from "http"

import fetch from "isomorphic-fetch"

const createFetch = (req?: IncomingMessage) => (
  input: RequestInfo,
  init: RequestInit = {}
) => {
  // Follow cookies to the API when IncomingMessage is present
  if (req && req.headers) {
    init.headers = {
      ...init.headers,

      // ? Should I forward other headers?
      cookie: req.headers.cookie
    }
  }

  return fetch(input, init)
}

export default createFetch
