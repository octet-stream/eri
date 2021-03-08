import {forwardRef} from "react"

import cn from "classnames"

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
const NameEditor = forwardRef(({className, ...props}, ref) => (
  <Input
    {...props}
    ref={ref}
    className={cn(container, className)}
    placeholder="Post title"
  />
))

export default NameEditor
