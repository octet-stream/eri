/**
 * @typedef {Object} UserName
 *
 * @property {string} firstName
 * @property {string} lastName
 */

/**
 * @param {UserName} param
 *
 * @return {UserName}
 */
const name = ({firstName, lastName}) => ({firstName, lastName})

export default name
