/**
 * Marks a property as read-only
 *
 * @param {Object<string, any>} target
 * @param {string} key
 * @param {Object<string, any>} descriptor
 */
const readOnly = (target, key, descriptor) => ({
  ...descriptor, writable: false, configurable: false
})

export default readOnly
