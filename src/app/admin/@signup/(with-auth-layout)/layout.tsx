import type {FC, ReactElement} from "react"
import type {Metadata} from "next"

import {AuthLayout} from "app/admin/_/layout/AuthLayout"

export const metadata: Metadata = {
  title: "Admin signup"
}

interface Props {
  children: ReactElement
}

const AdminSignupLayout: FC<Props> = ({children}) => (
  <AuthLayout>
    {children}
  </AuthLayout>
)

export default AdminSignupLayout
