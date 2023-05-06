"use client"

import {OPostsPageOutput} from "server/trpc/type/output/PostsPageOutput"

import {createPageDataContext} from "lib/context/createPageData"

export const {
  StateContext: PostsDataContext,
  StateContextProvider: PostsDataContextProvider,
  usePageData: usePostsData
} = createPageDataContext<OPostsPageOutput>()
