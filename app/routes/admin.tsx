import {
  LogOut,
  Menu,
  Settings2,
  SquareArrowOutUpRight,
  SquarePen
} from "lucide-react"
import type {FC} from "react"
import {Link, Outlet} from "react-router"

import {
  Breadcrumb,
  type BreadcrumbHandle,
  Breadcrumbs
} from "../components/common/Breadcrumbs.jsx"
import {
  Sidebar,
  SidebarItem,
  SidebarProvider,
  SidebarTrigger
} from "../components/common/Sidebar.jsx"
import {
  AdminLoaderErrorCode,
  isAdminLoaderError
} from "../server/lib/admin/adminLoaderError.js"

import type {Route} from "./+types/admin.ts"

import {AdminLoginPage} from "./admin_.login/AdminLoginPage.tsx"
import {ADMIN_LOGIN_PAGE_TITLE} from "./admin_.login/title.ts"
import {AdminSetupPage} from "./admin_.setup/AdminSetupPage.tsx"
import {ADMIN_SETUP_PAGE_TITLE} from "./admin_.setup/title.ts"

export const ErrorBoundary: FC<Route.ErrorBoundaryProps> = ({
  error,
  params,
  actionData
}) => {
  if (isAdminLoaderError(error)) {
    // TODO: Fix matches for this error
    if (error.data.code === AdminLoaderErrorCode.SETUP) {
      return (
        <AdminSetupPage
          {...{loaderData: null, params, actionData, matches: [] as any}}
        />
      )
    }

    if (error.data.code === AdminLoaderErrorCode.LOGIN) {
      return (
        <AdminLoginPage
          {...{loaderData: null, params, actionData, matches: [] as any}}
        />
      )
    }
  }

  throw error
}

export const meta: Route.MetaFunction = ({error}) => {
  let title = "Admin panel"

  if (isAdminLoaderError(error)) {
    if (error.data.code === AdminLoaderErrorCode.SETUP) {
      title = ADMIN_SETUP_PAGE_TITLE
    } else if (error.data.code === AdminLoaderErrorCode.LOGIN) {
      title = ADMIN_LOGIN_PAGE_TITLE
    }
  }

  return [{title}]
}

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb href="/admin">Dashboard</Breadcrumb>
}

const AdminLayout: FC<Route.ComponentProps> = () => (
  <SidebarProvider>
    <div className="w-full">
      <header className="border-b w-full sticky top-0 z-50 bg-background">
        <div className="flex max-h-full w-full p-5 gap-3 laptop:max-w-laptop mx-auto items-center">
          <SidebarTrigger>
            <Menu size={20} />
          </SidebarTrigger>

          {/* FIXME: This should be configurable */}
          <Link to="/admin">Eri's blog</Link>

          <div className="flex-1" />

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="font-normal text-foreground text-sm flex gap-3 items-center"
          >
            <span>View blog</span>

            <SquareArrowOutUpRight size={20} />
          </a>
        </div>
      </header>

      <div className="w-full laptop:max-w-laptop mx-auto post:grid post:grid-flow-col post:grid-cols-[200px_minmax(0,1fr)] items-start">
        <Sidebar>
          <SidebarItem icon={SquarePen} to="/admin/posts/new">
            New post
          </SidebarItem>

          <SidebarItem icon={Settings2} to="/admin/settings">
            Settings
          </SidebarItem>

          <div className="flex flex-1" />

          <SidebarItem icon={LogOut} asChild>
            <form action="/admin/logout" method="post">
              <button type="submit">Log out</button>
            </form>
          </SidebarItem>
        </Sidebar>

        <div className="flex flex-col p-5 gap-5 h-full">
          <Breadcrumbs />

          <div className="h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  </SidebarProvider>
)

export default AdminLayout
