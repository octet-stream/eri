// Based on: https://github.com/remix-run/react-router/blob/04a62722fea11baa9ccea682879e530791e28c00/packages/react-router/lib/server-runtime/routes.ts#L19-L56

import {type ServerBuild, matchRoutes} from "react-router"
import type {Simplify} from "../../../lib/types/Simplify.js"

export type ServerRouteManifest = ServerBuild["routes"]

export type ServerRoute = NonNullable<
  ServerRouteManifest[keyof ServerRouteManifest]
>

export type AgnosticRouteMatch = NonNullable<
  ReturnType<typeof matchRoutes>
>[number]

export type RouteMatchWithPattern = Simplify<
  AgnosticRouteMatch & {pattern: string}
>

const normalizePath = (path: string) =>
  path.replace(/\/{2,}/, "/").replace(/\/$/, "")

function groupRoutesByParentId(manifest: ServerRouteManifest) {
  const routes: Record<string, Omit<ServerRoute, "children">[]> = {}

  Object.values(manifest).forEach(route => {
    if (route) {
      const parentId = route.parentId || ""
      if (!routes[parentId]) {
        routes[parentId] = []
      }
      routes[parentId].push(route)
    }
  })

  return routes
}

// Create a map of routes by parentId to use recursively instead of
// repeatedly filtering the manifest.
export function createRoutes(
  manifest: ServerRouteManifest,
  parentId = "",
  routesByParentId: Record<
    string,
    Omit<ServerRoute, "children">[]
  > = groupRoutesByParentId(manifest)
): ServerRoute[] {
  return (routesByParentId[parentId] || []).map(route => ({
    ...route,

    children: createRoutes(manifest, route.id, routesByParentId)
  }))
}

export function getRouteMatches(
  manifest: ServerRouteManifest,
  url: string | URL,
  basename = "/"
) {
  const {pathname: current} = new URL(url)

  const matches = matchRoutes(createRoutes(manifest), current, basename)

  if (!matches) {
    return undefined
  }

  const res: RouteMatchWithPattern[] = []

  matches.reduce((prev, next) => {
    // Make pattern for next match. Here's some notes:
    // prev.pattern will be always empty for the first match (which is `root.tsx`), because it wasn't assigned to any match yet
    // prev.route.path will be empty string for `root.tsx`, so we replace extra leading `/` in normalizePath
    // next.route.path might be `undefined`, so we assing empty string and strip out extra `/` later
    const pattern = normalizePath(
      `${(prev as any as RouteMatchWithPattern).pattern || prev.route.path || ""}/${next.route.path || ""}`
    )

    const match = {...next, pattern}

    res.push(match)

    return match
  })

  return res
}

export function getCurrentRoteFromMatches(
  matches: RouteMatchWithPattern[],
  url: string | URL
) {
  const {pathname: current} = new URL(url)

  return matches.find(({pathname}) => pathname === current)
}

export function getCurrentRouteMeta(
  routes: ServerBuild["routes"],
  url: string | URL
) {
  const matches = getRouteMatches(routes, url)

  return matches ? getCurrentRoteFromMatches(matches, url) : undefined
}
