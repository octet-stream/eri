import create from "http-errors"

import AnyObject from "type/AnyObject"

const notFound = (subject?: string, options?: AnyObject) => {
  const message = subject ? `Can't find requested ${subject}` : "Not Found"

  return create(404, message, options)
}

export default notFound
