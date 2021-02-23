/**
 * Run given tasks sequentially
 *
 * @param tasks A list of functions to run
 * @param args a list of arguments to execute function with
 */
function runSerial(tasks: Function[], args: any[] = []) {
  const step = (prev: any, next: Function) => (
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
