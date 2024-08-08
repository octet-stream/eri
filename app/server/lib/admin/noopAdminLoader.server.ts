import {defineAdminLoader} from "./defineAdminLoader.server.js"

export const noopAdminLoader = defineAdminLoader(async () => null)
