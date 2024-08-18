import type {FC, ComponentPropsWithoutRef} from "react"
import {Toaster as Sonner} from "sonner"

export interface ToasterProps extends ComponentPropsWithoutRef<typeof Sonner> {}

export const Toaster: FC<ToasterProps> = props => (
  <Sonner
    className="toaster group"
    toastOptions={{
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        description: "group-[.toast]:text-muted-foreground",
        actionButton:
          "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton:
          "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
      }
    }}
    {...props}
  />
)
