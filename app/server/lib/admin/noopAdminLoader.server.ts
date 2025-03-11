import {withAdmin} from "./withAdmin.js"

export const noopAdminLoader = withAdmin(async () => null)
