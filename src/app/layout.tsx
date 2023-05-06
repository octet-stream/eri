import type {FC, ReactNode} from "react"
import type {Metadata} from "next"

import {Toaster} from "component/Toaster"

import "style/tailwind.css"

const TITLE_BASE = process.env.BLOG_NAME || "Blog"

export const metadata: Metadata = {
  title: {
    template: `%s | ${TITLE_BASE}`,
    default: TITLE_BASE
  }
}

interface Props {
  children: ReactNode
}

const RootLayout: FC<Props> = ({children}) => (
  <html lang="en">
    <head />

    <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
      <main className="w-screen min-h-screen flex">
        <div className="prose dark:prose-invert py-5 laptop:p-5 mx-auto flex flex-1 flex-col dark:text-white">
          {children}
        </div>
      </main>

      <Toaster position="top-center" />
    </body>
  </html>
)

export default RootLayout
