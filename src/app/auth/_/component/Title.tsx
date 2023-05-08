"use client"

import type {FC} from "react"

interface Props {
  children: string
}

export const Title: FC<Props> = ({children}) => (
  <div className="mb-6 text-2xl font-semibold text-center select-none">
    {children}
  </div>
)
