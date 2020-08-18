/**
 * @typedef {Object} Dates
 *
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date | null | undefined}  deletedAt
 */

/**
 * @param {Dates} param
 *
 * @return {Dates}
 */
const dates = ({createdAt, updatedAt, deletedAt}) => ({
  createdAt, updatedAt, deletedAt
})

export default dates
