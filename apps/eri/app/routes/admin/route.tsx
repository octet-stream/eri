import {json, type LoaderFunctionArgs, type MetaFunction} from "@remix-run/node"
import {useLoaderData, Outlet, Link} from "@remix-run/react"
import {SquarePen, Menu} from "lucide-react"
import type {FC} from "react"

import {parseCookie, serializeCookie} from "../../server/lib/auth/cookie.js"
import {User} from "../../server/db/entities.js"
import {withOrm} from "../../server/lib/db/orm.js"
import {lucia} from "../../server/lib/auth/lucia.js"

import {
  Breadcrumbs,
  Breadcrumb,
  type BreadcrumbHandle
} from "../../components/common/Breadcrumbs.jsx"
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarItem
} from "../../components/common/Sidebar.jsx"

import {AdminSetupPage} from "./pages/Setup.jsx"
import {AdminLoginPage} from "./pages/Login.jsx"

type AdminData<TUser = never> =
  | {hasAdminUser: boolean; isAuthorized: false}
  | {hasAdminUser: true; isAuthorized: true; user: TUser}

// FIXME: Remix runs loaders in parallel, so I need to improve admin workflow
export const loader = withOrm(async (orm, {request}: LoaderFunctionArgs) => {
  const [admin] = await orm.em.find(
    User,

    {},

    {
      fields: ["id"],
      limit: 1,
      orderBy: {
        createdAt: "asc"
      }
    }
  )

  if (!admin) {
    return json<AdminData>({hasAdminUser: false, isAuthorized: false})
  }

  const sessionId = await parseCookie(request.headers.get("cookie"))
  if (!sessionId) {
    return json<AdminData>({hasAdminUser: true, isAuthorized: false})
  }

  const {session, user} = await lucia.validateSession(sessionId)

  if (!(session || user)) {
    return json<AdminData>({hasAdminUser: true, isAuthorized: false})
  }

  // Refresh session cookie if necessary
  const headers = new Headers()
  if (session?.fresh) {
    headers.set("set-cookie", await serializeCookie(session.id))
  }

  return json<AdminData<NonNullable<typeof user>>>(
    {
      isAuthorized: !!session,
      hasAdminUser: true,
      user
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
  breadcrumb: () => <Breadcrumb href="/admin">Dashboard</Breadcrumb>
}

const AdminLayout: FC = () => {
  const data = useLoaderData<typeof loader>()

  // Render admin setup page if admin user not existent
  if (data.hasAdminUser === false) {
    return <AdminSetupPage />
  }

  // Render login page for guests
  if (data.isAuthorized === false) {
    return <AdminLoginPage />
  }

  return (
    <SidebarProvider>
      <div className="flex flex-1 flex-col w-full">
        <header className="border-b w-full">
          <div className="flex w-full p-5 gap-3 laptop:max-w-laptop mx-auto items-center">
            <SidebarTrigger>
              <Menu />
            </SidebarTrigger>

            <div className="flex-1" />

            <Link to="/" className="font-normal text-foreground text-sm">
              View blog
            </Link>
          </div>
        </header>

        <div className="flex flex-row flex-1 w-full laptop:max-w-laptop mx-auto">
          <Sidebar>
            <SidebarItem icon={SquarePen} href="/admin/posts/new">
              New post
            </SidebarItem>
          </Sidebar>

          <div className="flex flex-1 flex-col p-5 gap-5 min-w-0">
            <Breadcrumbs />

            <div className="flex flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
