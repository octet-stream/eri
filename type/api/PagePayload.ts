interface PagePayload<T> {
  count: number
  offset: number
  limit: number
  last: number
  current: number
  hasNext: boolean
  list: T[]
}

export default PagePayload
