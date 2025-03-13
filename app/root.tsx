import type {FC, ReactNode} from "react"
import {
  Links,
  Meta,
  type unstable_MiddlewareFunction as MiddlewareFunction,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router"

import config from "./server/lib/config.js"

// For some reason the page flickers in dev mode if tailwind.css imported directly, so I'll just add it as a link
import tailwindcss from "./tailwind.css?url"

import type {Route} from "./+types/root.js"
import {Toaster} from "./components/ui/Toaster.jsx"

import {withCheckPostPks} from "./server/middlewares/router/withCheckPostPks.js"

interface Props {
  children: ReactNode
}

// TODO: Rename this to `middleware` when RR changes the export name
export const unstable_middleware = [
  withCheckPostPks()
] satisfies MiddlewareFunction[]

export const loader = () => ({title: config.app.name}) // Expose the app's name to root layout

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: tailwindcss
  }
]

export const meta: Route.MetaFunction = ({data}) => [
  {
    title: data.title // Set default title to the app's name
  }
]

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
