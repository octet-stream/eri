import {useLoaderData} from "@remix-run/react"
import type {FC} from "react"

import {loader} from "./posts.$date.$name.jsx"

export {loader, meta} from "./posts.$date.$name.jsx"

const AdminPostViewPage: FC = () => {
  const {title} = useLoaderData<typeof loader>()

  return (
    <div>{title}</div>
  )
}

export default AdminPostViewPage
