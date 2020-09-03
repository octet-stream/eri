import Input from "component/Input"

import {container} from "./name.module.css"

const NameEditor = props => (
  <Input {...props} className={container} placeholder="Post title" />
)

export default NameEditor
