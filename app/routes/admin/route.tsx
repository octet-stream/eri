import {json, LoaderFunctionArgs, type MetaFunction} from "@remix-run/node"
import {useLoaderData, Outlet} from "@remix-run/react"
import type {FC} from "react"

import {User} from "../../server/db/entities.js"
import {withOrm} from "../../server/lib/db/orm.js"
import {lucia} from "../../server/lib/auth/lucia.js"

import {AdminSetupPage} from "./pages/Setup.jsx"
import {AdminLoginPage} from "./pages/Login.jsx"

type AdminData =
  | {hasAdminUser: boolean, isAuthorized: false}
  | {hasAdminUser: true, isAuthorized: true}

export const loader = withOrm(async (orm, {request}: LoaderFunctionArgs) => {
  const [admin] = await orm.em.find(User, {}, {
    fields: ["id"],
    limit: 1,
    orderBy: {
      createdAt: "asc"
    }
  })

  if (!admin) {
    return json<AdminData>({hasAdminUser: false, isAuthorized: false})
  }

  const cookie = request.headers.get("cookie")
  if (!cookie) {
    return json<AdminData>({hasAdminUser: true, isAuthorized: false})
  }

  const sessionId = lucia.readSessionCookie(cookie)
  if (!sessionId) {
    return json<AdminData>({hasAdminUser: true, isAuthorized: false})
  }

  const {session} = await lucia.validateSession(sessionId)

  // Refresh session cookie if necessary
  const headers = new Headers()
  if (session?.fresh) {
    headers.set("set-cookie", lucia.createSessionCookie(session.id).serialize())
  }

  return json<AdminData>(
    {
      isAuthorized: !!session,
      hasAdminUser: true
    },

    {
      headers
    }
  )
})

export const meta: MetaFunction<typeof loader> = ({data}) => {
  let title: string
  if (data?.isAuthorized === true) {
    title = "Admin panel"
  } else if (data?.hasAdminUser === true) {
    title = "Login"
  } else {
    title = "Setup"
  }

  return [{title}]
}

const AdminLayout: FC = () => {
  const data = useLoaderData<typeof loader>()

  // Render admin setup page if admin user not existent
  if (data.hasAdminUser === false) {
    return <AdminSetupPage />
  }

  if (data.isAuthorized === false) {
    return <AdminLoginPage />
  }

  return <Outlet />
}

export default AdminLayout
