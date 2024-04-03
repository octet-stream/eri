import {Outlet} from "@remix-run/react"

import {
  Breadcrumbs,
  Breadcrumb,
  type BreadcrumbHandle
} from "../components/common/Breadcrumbs.jsx"

export const handle: BreadcrumbHandle = {
  breadcrumb: () => (
    <Breadcrumb href="/">
      Blog
    </Breadcrumb>
  )
}

const MainLayout = () => (
  <div className="flex flex-col w-full pb-5 px-5 laptop:w-post laptop:mx-auto">
    <header className="py-5">
      <Breadcrumbs />
    </header>

    <Outlet />
  </div>
)

export default MainLayout
