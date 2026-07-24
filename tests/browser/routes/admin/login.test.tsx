import type {SubmissionResult} from "@conform-to/react"
import {createRoutesStub, Outlet} from "react-router"
import {expect, test} from "vitest"
import {userEvent} from "vitest/browser"
import {render} from "vitest-browser-react"

import {AdminLoginPage} from "../../../../app/routes/admin_.login/AdminLoginPage.tsx"

test("displays login form", async () => {
  const Stub = createRoutesStub([
    {
      path: "/admin",
      Component: () => <Outlet />
    },
    {
      path: "/admin/login",
      Component: AdminLoginPage as any
    }
  ])

  const screen = await render(<Stub initialEntries={["/admin/login"]} />)

  await expect.element(screen.getByText("Login")).toBeVisible()
})

test("has active Log in button", async () => {
  const Stub = createRoutesStub([
    {
      path: "/admin",
      Component: () => <Outlet />
    },
    {
      path: "/admin/login",
      Component: AdminLoginPage
    }
  ])

  const screen = await render(<Stub initialEntries={["/admin/login"]} />)

  await expect
    .element(screen.getByRole("button", {name: "Log in"}))
    .not.toBeDisabled()
})

test("has active Passkey button", async () => {
  const Stub = createRoutesStub([
    {
      path: "/admin",
      Component: () => <Outlet />
    },
    {
      path: "/admin/login",
      Component: AdminLoginPage
    }
  ])

  const screen = await render(<Stub initialEntries={["/admin/login"]} />)

  await expect
    .element(screen.getByRole("button", {name: "Use Passkey"}))
    .toBeEnabled()
})

test.skip("hightlight input errors", async () => {
  const emailError = "Email required"
  const passwordError = "Password required"

  const Stub = createRoutesStub([
    {
      path: "/admin",
      Component: () => <Outlet />
    },
    {
      path: "/admin/login",
      Component: AdminLoginPage,
      action(): SubmissionResult {
        return {
          error: {
            email: [emailError],
            password: [passwordError]
          }
        }
      }
    }
  ])

  const screen = await render(<Stub initialEntries={["/admin/login"]} />)

  const element = screen.getByRole("button", {name: "Log in"})

  // The element is here
  await expect.element(element).toBeInTheDocument()

  // ...but I can't click on the button, wtf
  await userEvent.click(element)

  await expect
    .element(screen.getByPlaceholder("me@example.com"))
    .toHaveClass("border-destructive")

  await expect
    .element(screen.getByPlaceholder("your password"))
    .toHaveClass("border-destructive")
})
