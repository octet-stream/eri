import type {ComponentProps, ComponentRef, FC} from "react"

import {cn} from "../../lib/utils/cn.ts"

export type CardProps = ComponentProps<"div">

export const Card: FC<CardProps> = ({className, ...props}) => (
  <div
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-xs",
      className
    )}
    {...props}
  />
)

export type CardRef = ComponentRef<typeof Card>

export type CardHeaderProps = ComponentProps<"div">

export const CardHeader: FC<CardHeaderProps> = ({className, ...props}) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
)

export type CardHeaderRef = ComponentRef<typeof CardHeader>

export type CardTitleProps = ComponentProps<"h3">

export const CardTitle: FC<CardTitleProps> = ({
  className,
  children,
  ...props
}) => (
  <h3
    {...props}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
  >
    {children}
  </h3>
)

export type CardTitleRef = ComponentRef<typeof CardTitle>

export type CardDescriptionProps = ComponentProps<"p">

export const CardDescription: FC<CardDescriptionProps> = ({
  className,
  ...props
}) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

export type CardDescriptionRef = ComponentRef<typeof CardDescription>

export type CardContentProps = ComponentProps<"div">

export const CardContent: FC<CardContentProps> = ({className, ...props}) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
)

export type CardContentRef = ComponentRef<typeof CardContent>

export type CardFooterProps = ComponentProps<"div">

export const CardFooter: FC<CardFooterProps> = ({className, ...props}) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
)

export type CardFooterRef = ComponentRef<typeof CardFooter>
