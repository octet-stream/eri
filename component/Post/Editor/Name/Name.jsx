import {forwardRef} from "react"

import Input from "component/Input"

import {container} from "./name.module.css"

/**
 * @callback OnSubmitCallback
 *
 * @param {React.SyntheticEvent} event
 *
 * @return {void}
 */

/**
 * @typedef {Object} NameEditorProps
 *
 * @prop {string} name
 * @prop {OnSubmitCallback} onSubmit
 * @prop {string} [className]
 */

/**
 * @type {React.FC<NameEditorProps>}
 */
const NameEditor = forwardRef((props, ref) => (
  <Input {...props} ref={ref} className={container} placeholder="Post title" />
))

export default NameEditor
