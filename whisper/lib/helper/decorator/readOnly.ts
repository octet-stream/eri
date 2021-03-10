/**
 * Marks a property as read-only
 */
const readOnly = (
  target: any,
  key: string,
  descriptor: PropertyDecorator
) => ({
  ...descriptor, writable: false, configurable: false
})

export default readOnly
