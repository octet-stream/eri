import type {BreadcrumbHandle} from "../components/Breadcrumbs.jsx"
import {BreadcrumbPage} from "../components/ui/Breadcrumb.jsx"

export const handle: BreadcrumbHandle = {
  breadcrumb: () => (
    <BreadcrumbPage>
      Post
    </BreadcrumbPage>
  )
}

// eslint-disable-next-line no-restricted-exports
export {default, loader, meta} from "./posts.$date.$name.jsx"
