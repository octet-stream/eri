import create from "server/error/common/forbidden"

/**
 * @param {Object.<string, any>} [options]
 */
const forbidden = (operation, options) => create(
  {
    subject: "Post",
    operation
  },

  options
)

export default forbidden
