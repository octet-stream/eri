/* eslint-disable no-undef */
import {Headers} from "undici"

if (typeof Headers !== "function") {
  globalThis.Headers = Headers
}
