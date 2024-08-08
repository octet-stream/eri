import type {FC} from "react"

export const NoPosts: FC = () => (
  <div className="flex flex-1 justify-center items-center">
    <p className="text-sm text-muted-foreground">There are no posts yet</p>
  </div>
)
