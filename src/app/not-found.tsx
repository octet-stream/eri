import type {Metadata} from "next"
import type {FC} from "react"

export const metadata: Metadata = {
  title: {
    absolute: "Page not found"
  }
}

const NotFound: FC = () => (
  <div className="w-full mobile:w-mobile m-auto text-center select-none mobile:flex mobile:justify-center">
    <div className="mobile:flex">
      <h1 className="text-4xl">404</h1>

      <div className="hidden mobile:block w-px mx-3 bg-black dark:bg-white" />

      <div className="mobile:flex mobile:items-center">page not found</div>
    </div>
  </div>
)

export default NotFound
