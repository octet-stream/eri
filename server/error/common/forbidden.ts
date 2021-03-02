import create from "http-errors"

import AnyObject from "type/AnyObject"

interface ForbiddenErrorParams {
  subject?: string
  operation?: string
}

const forbidden = (
  {subject, operation}: ForbiddenErrorParams, options: AnyObject
) => {
  const message = subject && operation
    ? `You can't perform "${operation}" operation on "${subject}"`
    : "Access denied."

  return create(403, message, options)
}

export default forbidden
