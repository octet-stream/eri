import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.jsx"
import {Breadcrumb} from "../components/common/Breadcrumbs.jsx"

export const handle: BreadcrumbHandle = {
  breadcrumb: () => (
    <Breadcrumb>
      Post
    </Breadcrumb>
  )
}

// eslint-disable-next-line no-restricted-exports
export {default, loader, meta} from "./_blog.posts.$date.$name.jsx"
