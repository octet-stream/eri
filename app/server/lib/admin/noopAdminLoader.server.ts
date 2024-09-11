import {defineAdminLoader} from "./defineAdminLoader.js"

export const noopAdminLoader = defineAdminLoader(async () => null)
