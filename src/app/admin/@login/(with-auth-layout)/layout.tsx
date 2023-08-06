import type {FC, ReactElement} from "react"

import {AuthLayout} from "app/admin/_/layout/AuthLayout"

interface Props {
  children: ReactElement
}

const AdminLoginLayout: FC<Props> = ({children}) => (
  <AuthLayout>
    {children}
  </AuthLayout>
)

export default AdminLoginLayout
