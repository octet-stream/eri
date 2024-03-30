import {json, type MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"
import type {FC} from "react"

import {User} from "../../server/db/entities.js"
import {withOrm} from "../../server/lib/db/orm.js"

import {AdminSetupPage} from "./pages/Setup.jsx"

interface AdminData {
  isInstalled: boolean
}

export const loader = withOrm(async orm => {
  const [user] = await orm.em.find(User, {}, {
    fields: ["id"],
    limit: 1,
    orderBy: {
      createdAt: "asc"
    }
  })

  return json<AdminData>({isInstalled: !!user})
})

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {
    // TODO: Add title for Login page
    title: data?.isInstalled ? "Admin" : "Setup"
  }
]

const AdminLayout: FC = () => {
  const data = useLoaderData<typeof loader>()

  // Render admin setup page if admin user not existent
  if (!data.isInstalled) {
    return <AdminSetupPage />
  }

  // TOOD: Render login page first, if user is not authorized
  return <div>Admin</div>
}

export default AdminLayout
