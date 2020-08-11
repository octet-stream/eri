import {stat} from "fs-extra"

/**
 * Returns size of a file using fs.stat
 *
 * @param {string} path
 */
const getSize = path => stat(path).then(({size}) => size)

export default getSize
