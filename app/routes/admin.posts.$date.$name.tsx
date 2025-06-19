import type {FC} from "react"
import {Outlet} from "react-router"

import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.jsx"
import {Breadcrumb} from "../components/common/Breadcrumbs.jsx"

export const handle: BreadcrumbHandle = {
  breadcrumb: ({pathname}) => <Breadcrumb href={pathname}>Post</Breadcrumb>
}

const AdminPostDetailsPage: FC = () => <Outlet />

export default AdminPostDetailsPage
