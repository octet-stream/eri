import type {FC, ReactNode} from "react"
import type {Metadata} from "next"

import {Toaster} from "component/Toaster"

import "style/tailwind.css"

export const metadata: Metadata = {
  title: process.env.BLOG_NAME || "Blog"
}

interface Props {
  children: ReactNode
}

const RootLayout: FC<Props> = ({children}) => (
  <html lang="en">
    <head />

    <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
      <main className="w-screen h-screen">
        <div className="min-h-screen w-full lg:max-w-laptop lg:mx-auto lg:py-5 p-5 flex flex-col">
          {children}
        </div>
      </main>

      <Toaster position="top-center" />
    </body>
  </html>
)

export default RootLayout
