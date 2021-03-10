const {isArray} = Array

const step = (prev: any, next: Function) => (
  Promise.resolve(prev).then(res => next(res))
)

/**
 * @param tasks A list of functions to run
 * @param initial initial value to execute the first task
 */
function arrayWaterfall(tasks: Function[], initial: any = undefined) {
  if (!isArray(tasks)) {
    return Promise.reject(new TypeError("Tasks must be passed as an array."))
  }

  if (tasks.length === 1) {
    return step(initial, tasks[0])
  }

  return tasks.reduce(step, initial)
}

export default arrayWaterfall
