import {json, LoaderFunctionArgs, type MetaFunction} from "@remix-run/node"
import {useLoaderData, Outlet} from "@remix-run/react"
import type {FC} from "react"

import {
  parseCookie,
  serializeCookie
} from "../../server/lib/auth/cookie.js"
import {User} from "../../server/db/entities.js"
import {withOrm} from "../../server/lib/db/orm.js"
import {lucia} from "../../server/lib/auth/lucia.js"

import {
  Breadcrumbs,
  Breadcrumb,
  type BreadcrumbHandle
} from "../../components/common/Breadcrumbs.jsx"

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

  const sessionId = await parseCookie(request.headers.get("cookie"))
  if (!sessionId) {
    return json<AdminData>({hasAdminUser: true, isAuthorized: false})
  }

  const {session} = await lucia.validateSession(sessionId)

  // Refresh session cookie if necessary
  const headers = new Headers()
  if (session?.fresh) {
    headers.set("set-cookie", await serializeCookie(session.id))
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

export const handle: BreadcrumbHandle = {
  breadcrumb: () => (
    <Breadcrumb href="/admin">
      Dashboard
    </Breadcrumb>
  )
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

  return (
    <div className="w-full laptop:max-w-post mx-auto px-5">
      <header className="py-5">
        <Breadcrumbs />
      </header>

      <Outlet />
    </div>
  )
}

export default AdminLayout
