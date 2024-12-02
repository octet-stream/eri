import {flatRoutes} from "@react-router/fs-routes"

import {TESTS_SEARCH_PATTERN} from "../vite.config.js"

export default flatRoutes({ignoredRouteFiles: [TESTS_SEARCH_PATTERN]})
