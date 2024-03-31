import {json, type MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"
import type {FC} from "react"

import {User} from "../../server/db/entities.js"
import {withOrm} from "../../server/lib/db/orm.js"

import {AdminSetupPage} from "./pages/Setup.jsx"
import {AdminLoginPage} from "./pages/Login.jsx"

interface AdminData {
  hasAdminUser: boolean
}

export const loader = withOrm(async orm => {
  const [user] = await orm.em.find(User, {}, {
    fields: ["id"],
    limit: 1,
    orderBy: {
      createdAt: "asc"
    }
  })

  return json<AdminData>({hasAdminUser: !!user})
})

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {
    // TODO: Add title for Login page
    title: data?.hasAdminUser ? "Admin" : "Setup"
  }
]

const AdminLayout: FC = () => {
  const {hasAdminUser} = useLoaderData<typeof loader>()

  // Render admin setup page if admin user not existent
  if (!hasAdminUser) {
    return <AdminSetupPage />
  }

  return <AdminLoginPage />
}

export default AdminLayout
