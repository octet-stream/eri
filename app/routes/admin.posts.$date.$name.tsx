import {Outlet} from "@remix-run/react"
import type {FC} from "react"

import {Breadcrumb} from "../components/common/Breadcrumbs.jsx"
import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.jsx"

export const handle: BreadcrumbHandle = {
  breadcrumb: ({pathname}) => <Breadcrumb href={pathname}>Post</Breadcrumb>
}

const AdminPostDetailsPage: FC = () => <Outlet />

export default AdminPostDetailsPage
