import {withAdminLoader} from "./withAdmin.ts"

export const noopAdminLoader = withAdminLoader(async () => null)
