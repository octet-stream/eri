import type {ComponentProps, ComponentRef, FC} from "react"
import {Toaster as Sonner} from "sonner"

export interface ToasterProps extends ComponentProps<typeof Sonner> {}

// ! I have no idea, but without `!important` sonner theme breaks. I'll kepp it there untill I figure out what's going on here.
export const Toaster: FC<ToasterProps> = props => (
  <Sonner
    className="toaster group"
    toastOptions={{
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-background! group-[.toaster]:text-foreground! group-[.toaster]:border-border! group-[.toaster]:shadow-lg!",
        description: "group-[.toast]:text-muted-foreground!",
        actionButton:
          "group-[.toast]:bg-primary! group-[.toast]:text-primary-foreground!",
        cancelButton:
          "group-[.toast]:bg-muted! group-[.toast]:text-muted-foreground!"
      }
    }}
    {...props}
  />
)

export type ToasterRef = ComponentRef<typeof Toaster>
