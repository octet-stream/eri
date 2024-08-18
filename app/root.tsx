import {Links, Meta, Outlet, Scripts, ScrollRestoration} from "@remix-run/react"
import type {FC, ReactNode} from "react"

import "./tailwind.css"

import {Toaster} from "./components/ui/Toaster.jsx"

interface Props {
  children: ReactNode
}

export const Layout: FC<Props> = ({children}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />

      <Links />
    </head>

    <body className="bg-background text-foreground">
      <main className="min-h-dynamic-screen flex">{children}</main>

      <Toaster />

      <ScrollRestoration />

      <Scripts />
    </body>
  </html>
)

const App = () => <Outlet />

export default App
