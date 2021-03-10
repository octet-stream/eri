import create from "http-errors"

const unauthorized = (message?: string) => create(401, message)

export default unauthorized
