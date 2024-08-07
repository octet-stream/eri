import {
  Outlet,
  Link,
  type MetaArgs_SingleFetch as MetaArgs,
  type MetaDescriptor,
  useRouteError,
  isRouteErrorResponse
} from "@remix-run/react"
import {SquarePen, Menu} from "lucide-react"
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

import {AdminLoaderErrorCode} from "../../lib/admin/AdminLoaderErrorCode.js"

export const ErrorBoundary = () => {
  const error = useRouteError()

  if (!isRouteErrorResponse(error) || error.status !== 401) {
    throw error
  }

  if (error.data === AdminLoaderErrorCode.SETUP) {
    return <AdminSetupPage />
  }

  if (error.data === AdminLoaderErrorCode.LOGIN) {
    return <AdminLoginPage />
  }

  throw error
}

export const meta = ({error}: MetaArgs): MetaDescriptor[] => {
  let title = "Admin panel"

  if (isRouteErrorResponse(error)) {
    if (error.data === AdminLoaderErrorCode.SETUP) {
      title = "Setup"
    } else if (error.data === AdminLoaderErrorCode.LOGIN) {
      title = "Login"
    }
  }

  return [{title}]
}

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb href="/admin">Dashboard</Breadcrumb>
}

const AdminLayout: FC = () => (
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

export default AdminLayout
