import type {FC} from "react"

export const NoPosts: FC = () => (
  <div className="flex flex-1 justify-center items-center select-none">
    <div className="py-2 px-5 text-slate-400 rounded-md">
      There&apos;s nothing to read here yet
    </div>
  </div>
)
