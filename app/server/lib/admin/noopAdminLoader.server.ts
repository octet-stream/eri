import {withAdmin} from "./withAdmin.ts"

export const noopAdminLoader = withAdmin(async () => null)
