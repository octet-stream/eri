import util from "util"

import create from "lib/helper/decorator/createDecorator"

const deprecate = <T extends Function = any>(msg: string, code?: string) => (
  create((fn: T) => util.deprecate<T>(fn, msg, code))
)

export default deprecate
