import AnyObject from "type/AnyObject"

import create from "error/common/forbidden"

const forbidden = (operation: string, options?: AnyObject) => create({
  subject: "Post",
  operation
}, options)

export default forbidden
