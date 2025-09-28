import type {FC, ReactNode} from "react"
import {
  Links,
  Meta,
  type MiddlewareFunction,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router"

import type {Route} from "./+types/root.ts"
import {Toaster} from "./components/ui/Toaster.tsx"
import config from "./server/lib/config.ts"
import {withCheckPostPks} from "./server/middlewares/router/withCheckPostPks.ts"
// For some reason the page flickers in dev mode if tailwind.css imported directly, so I'll just add it as a link
import tailwindcss from "./tailwind.css?url"

interface Props {
  children: ReactNode
}

export const middleware = [
  withCheckPostPks()
] satisfies MiddlewareFunction<any>[]

export const loader = () => ({title: config.app.name}) // Expose the app's name to root layout

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: tailwindcss
  }
]

export const meta: Route.MetaFunction = ({loaderData}) => [
  {
    title: loaderData?.title // Set default title to the app's name
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
