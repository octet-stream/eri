import {
  Outlet,
  type MetaArgs_SingleFetch as MetaArgs,
  type MetaDescriptor,
  useRouteError,
  isRouteErrorResponse,
  Link
} from "@remix-run/react"
import {
  SquarePen,
  Menu,
  Settings2,
  LogOut,
  SquareArrowOutUpRight
} from "lucide-react"
import type {FC} from "react"

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
import {AdminLoginPage} from "./pages/Login.jsx"
import {AdminSetupPage} from "./pages/Setup.jsx"

import {AdminLoaderErrorCode} from "../../server/lib/admin/AdminLoaderErrorCode.js"

export const ErrorBoundary: FC = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.data === AdminLoaderErrorCode.SETUP) {
      return <AdminSetupPage />
    }

    if (error.data === AdminLoaderErrorCode.LOGIN) {
      return <AdminLoginPage />
    }
  }

  throw error
}

export const meta = ({error}: MetaArgs): MetaDescriptor[] => {
  let title = "Admin panel"

  if (isRouteErrorResponse(error)) {
    if (error.data === AdminLoaderErrorCode.SETUP) {
      title = `Setup – ${title}`
    } else if (error.data === AdminLoaderErrorCode.LOGIN) {
      title = `Login – ${title}`
    }
  }

  return [{title}]
}

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb href="/admin">Dashboard</Breadcrumb>
}

const AdminLayout: FC = () => (
  <SidebarProvider>
    <div className="w-full flex flex-col">
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
            className="font-normal text-foreground text-sm flex gap-2 items-center"
          >
            <span>View blog</span>

            <SquareArrowOutUpRight size={20} />
          </a>
        </div>
      </header>

      <div className="flex-1">
        <div className="w-full laptop:max-w-laptop mx-auto post:grid post:grid-flow-col post:grid-cols-[200px_minmax(0,1fr)] items-start">
          <Sidebar>
            <SidebarItem icon={SquarePen} href="/admin/posts/new">
              New post
            </SidebarItem>

            <SidebarItem icon={Settings2} href="/admin/settings">
              Settings
            </SidebarItem>

            <div className="flex flex-1" />

            <SidebarItem icon={LogOut} href="/admin/logout">
              Log out
            </SidebarItem>
          </Sidebar>

          {/* <div className="hidden post:block" /> */}

          <div className="flex flex-1 flex-col p-5 gap-5 min-w-0">
            <Breadcrumbs />

            <div className="flex flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  </SidebarProvider>
)

export default AdminLayout
