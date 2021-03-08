import isFunction from "lodash/isFunction"

/**
 * Creates decorator for a function, class or method
 * using given function as implementation
 *
 * @param {Function} decorator A decorator implementation
 *
 * @return {Function}
 */
const createDecorator = decorator => (...args) => {
  const [target, , descriptor] = args

  if (isFunction(target) && args.length === 1) {
    return decorator(target)
  }

  if (isFunction(descriptor.initializer)) {
    const init = descriptor.initializer

    descriptor.initializer = function initializer() {
      return decorator(init.call(this))
    }
  } else {
    const fn = descriptor.value

    descriptor.value = decorator(fn)
  }

  return descriptor
}

export default createDecorator
