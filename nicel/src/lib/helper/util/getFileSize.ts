import {stat} from "fs-extra"

/**
 * Returns size of a file
 *
 * @param path A path to file
 */
const getFileSize = (path: string) => stat(path).then(({size}) => size)

export default getFileSize
