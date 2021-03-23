import create from "error/common/notFound"

import AnyObject from "type/AnyObject"

const notFound = (options?: AnyObject) => create("Post", options)

export default notFound
