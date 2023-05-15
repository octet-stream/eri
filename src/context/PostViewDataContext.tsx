"use client"

import type {OPostBaseOutput} from "server/trpc/type/output/PostBaseOutput"

import {createPageDataContext} from "lib/context/createPageData"

export const {
  StateContext: PostViewDataContext,
  StateContextProvider: PostViewDataContextProvider,
  usePageData: usePostViewData
} = createPageDataContext<OPostBaseOutput>()
