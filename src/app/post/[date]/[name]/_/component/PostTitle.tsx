"use client"

import type {FC} from "react"

import {usePostData} from "context/PostDataContext"

import {H1} from "component/Heading"

// TODO: Make one universal component for editor and view
export const PostTitle: FC = () => {
  const {title} = usePostData()

  return (
    <H1 className="mb-0">
      {title}
    </H1>
  )
}
