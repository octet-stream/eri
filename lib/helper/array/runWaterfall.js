const {isArray} = Array

/**
 * @param {Promise<any>} prev
 * @param {(prevTaskResult: any) => any} next
 *
 * @api private
 */
const step = (prev, next) => Promise.resolve(prev).then(res => next(res))

/**
 * @param {Array<(prevTaskResult: any) => any>} tasks
 * @param {any} [initial = undefined] - initial value to execute the first task
 *
 * @return {Promise<any>} - result of the last executed task
 *
 * @throws {TypeError} when tasks given in a wrong type
 */
function arrayWaterfall(tasks, initial) {
  if (!isArray(tasks)) {
    return Promise.reject(new TypeError("Tasks must be passed as an array."))
  }

  if (tasks.length === 1) {
    return step(initial, tasks[0])
  }

  return tasks.reduce(step, initial)
}

export default arrayWaterfall
