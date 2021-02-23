/**
 * Run given tasks in parallel
 *
 * @param tasks A list of functions to run
 * @param args a list of arguments to execute function with
 */
const runParallel = (tasks: Function[], args = []): Promise<any[]> => (
  Promise.all(tasks.map(task => task(...args)))
)

export default runParallel
