"use client"

import type {OPostOutput} from "server/trpc/type/output/PostOutput"

import {createPageDataContext} from "lib/context/createPageData"

export const {
  StateContext: PostDataContext,
  StateContextProvider: PostDataContextProvider,
  usePageData: usePostData
} = createPageDataContext<OPostOutput>()
