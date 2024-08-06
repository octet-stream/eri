import {forwardRef, type InputHTMLAttributes} from "react"
import {cn} from "@udecode/cn"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string[]
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({className, type, errors, ...props}, ref) => (
    <input
      {...props}
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",

        {
          "border-destructive": errors
        },

        className
      )}
    />
  )
)

Input.displayName = "Input"
