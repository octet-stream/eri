import {expect, test} from "vitest"
import {render} from "vitest-browser-react"

import {Input} from "../../../app/components/ui/Input.jsx"

test("highlights errors", async () => {
  const screen = render(
    <Input placeholder="test" errors={["Something's broken"]} />
  )

  await expect
    .element(screen.getByPlaceholder("test"))
    .toHaveClass("border-destructive")
})
