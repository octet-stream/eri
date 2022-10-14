export function urlDirname(url: string): string {
  if (url.length === 0 || url === "/" || url === ".") {
    return "/"
  }

  const index = url.lastIndexOf("/")

  if (index === -1) {
    return url
  }

  if (index === 0) {
    return "/"
  }

  return url.slice(0, index)
}
