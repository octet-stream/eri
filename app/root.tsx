import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react"

import "./tailwind.css"

export const Layout = ({children}: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />

      <Links />
    </head>

    <body className="bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      {children}

      <ScrollRestoration />

      <Scripts />
    </body>
  </html>
)

const App = () => <Outlet />

export default App
