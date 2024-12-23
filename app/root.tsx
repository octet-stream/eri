import type {FC, ReactNode} from "react"
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from "react-router"

// For some reason the page flickers in dev mode if tailwind.css imported directly, so I'll just add it as a link
import tailwindcss from "./tailwind.css?url"

import type {Route} from "./+types/root.js"
import {Toaster} from "./components/ui/Toaster.jsx"

interface Props {
  children: ReactNode
}

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: tailwindcss
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
