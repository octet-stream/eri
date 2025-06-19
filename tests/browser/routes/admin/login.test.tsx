import type {SubmissionResult} from "@conform-to/react"
import {createRoutesStub} from "react-router"
import {expect, test} from "vitest"
import {render} from "vitest-browser-react"

import {AdminLoginPage} from "../../../../app/routes/admin_.login/AdminLoginPage.jsx"

test("displays login form", async () => {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: AdminLoginPage as any
    }
  ])

  const screen = render(<Stub initialEntries={["/"]} />)

  await expect.element(screen.getByText("Login")).toBeVisible()
})

test("has active Log in button", async () => {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: AdminLoginPage as any
    }
  ])

  const screen = render(<Stub initialEntries={["/"]} />)

  await expect
    .element(screen.getByRole("button", {name: "Log in"}))
    .not.toBeDisabled()
})

test("has active Passkey button", async () => {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: AdminLoginPage as any
    }
  ])

  const screen = render(<Stub initialEntries={["/"]} />)

  await expect
    .element(screen.getByRole("button", {name: "Use Passkey"}))
    .toBeEnabled()
})

test("hightlight input errors", async () => {
  const emailError = "Email required"
  const passwordError = "Password required"

  const Stub = createRoutesStub([
    {
      path: "/",
      Component: AdminLoginPage as any,
      async action(): Promise<SubmissionResult> {
        return {
          error: {
            email: [emailError],
            password: [passwordError]
          }
        }
      }
    }
  ])

  const screen = render(<Stub initialEntries={["/"]} />)

  await screen.getByRole("button", {name: "Log in"}).click()

  await expect
    .element(screen.getByPlaceholder("me@example.com"))
    .toHaveClass("border-destructive")

  await expect
    .element(screen.getByPlaceholder("your password"))
    .toHaveClass("border-destructive")
})
