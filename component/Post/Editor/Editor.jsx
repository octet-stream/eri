import {Fragment, useState} from "react"

import Title from "component/Title"

import Name from "./Name"
import Text from "./Text"

import {container} from "./editor.module.css"

function Editor() {
  const [name, setName] = useState("")
  const [text, setText] = useState([{
    type: "paragraph",
    children: [{
      text: ""
    }]
  }])

  /**
   * @param {import("react").SyntheticEvent} event
   */
  const onChangeName = ({target}) => setName(target.value)

  return (
    <Fragment>
      <Title title={name || "Untitled"} />

      <div className={container}>
        <Name value={name} onChange={onChangeName} />

        <Text value={text} onChange={setText} />
      </div>
    </Fragment>
  )
}

export default Editor
