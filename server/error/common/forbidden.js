import create from "http-errors"

const forbidden = ({subject, operation}, options) => create(
  403, `You can't perform ${operation} operation on ${subject}`, options
)

export default forbidden
