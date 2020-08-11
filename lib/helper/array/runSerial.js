/**
 * Run given tasks sequentially
 *
 * @param {Array<Promise<any>>} tasks
 * @param {any[]} [args = []] - a list of arguments to execute function with
 *
 * @return {Promise<any[]>}
 */
function runSerial(tasks, args = []) {
  /**
  * @param {Promise<any[]>} prev
  * @param {(...args: any[]) => any} next
  *
  * @api private
  */
  const step = (prev, next) => (
    Promise.resolve(prev).then(async results => {
      const result = await next(...args)

      results.push(result)

      return results
    })
  )

  if (tasks.length <= 1) {
    return step([], tasks[0])
  }

  return tasks.reduce(step, [])
}

export default runSerial
