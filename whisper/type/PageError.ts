export default interface PageError {
  name: string
  message: string
  status?: number
  statusCode?: number
  statusText: string
  code?: string
  stack: string
}
