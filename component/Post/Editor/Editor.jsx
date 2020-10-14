// @refresh reset
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import {withReact, Slate, Editable} from "slate-react"
import {Fragment, useState, useMemo} from "react"
import slate, {serialize} from "remark-slate"
import {withHistory} from "slate-history"
import {createEditor} from "slate"

import mdast from "remark-parse"
import noop from "lodash/noop"
import unified from "unified"
import cn from "classnames"

import Title from "component/Title"
import Button from "component/Button"

import Name from "component/Post/Editor/Name"
import Actions from "component/Post/Editor/Actions"

import renderLeaf from "./renderLeaf"

import {container, content, field, editable, buttons} from "./editor.module.css"

/**
 * @typedef {import("slate").Node} Node
 */

/**
 * @param {Node[]} nodes
 */
const toMarkdown = nodes => nodes.map(node => serialize(node)).join("")

const toSlate = unified().use(mdast, {commonmark: true}).use(slate)

// ! Set this as defaut state because slate falls for some reason when state is empty
/**
 * @type {Node}
 */
const defaultNode = {
  type: "paragraph",
  children: [{
    text: ""
  }]
}

/**
 * @typedef {Object} PostData
 *
 * @prop {string} title
 * @prop {string} text
 * @prop {boolean} isDraft
 */

/**
 * @callback EditorSubmitCallback
 *
 * @param {PostData} data
 *
 * @return {Promise<PostData & {id: number, slug: string}>}
 */

/**
 * @typedef {Object} PostEditorProps
 *
 * @prop {boolean} [isNew]
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {React.SyntheticEvent} [onRemove]
 * @prop {EditorSubmitCallback} onSubmit
 */

/**
 * @type {React.FC<PostEditorProps>}
 */
const Editor = ({isNew, onRemove, onSubmit, text, title: initialTitle}) => {
  /** @type {Node[]} */
  const initialNodes = useMemo(() => {
    /** @type {{result: Node[]}} */
    const {result} = toSlate.processSync(text)

    return result.length ? result : [defaultNode]
  }, [text])

  const [title, setTitle] = useState(initialTitle)
  const [nodes, updateNodes] = useState(initialNodes)

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  /**
   * @param {React.SyntheticEvent} event
   */
  const onChangeTitle = ({target}) => setTitle(target.value)

  /**
   * @param {boolean} isDraft Indicates whether the post must be saved as draf or published
   */
  const save = isDraft => onSubmit({title, isDraft, text: toMarkdown(nodes)})

  const onSave = () => save(true)

  const onPublish = () => save(false)

  return (
    <Fragment>
      <Title title={title || "Untitled"} />

      <div className={container}>
        <div className={content}>
          <Name value={title} onChange={onChangeTitle} className={field} />

          <Slate editor={editor} value={nodes} onChange={updateNodes}>
            <Editable
              className={cn(editable, field)}
              placeholder="Post text"
              renderLeaf={renderLeaf}
            />
          </Slate>
        </div>

        <Actions>
          <div className={buttons}>
            {
              do {
                if (!isNew) {
                  <Fragment>
                    <Button variant="secondary" onClick={onRemove}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </Fragment>
                }
              }
            }
            <Button variant="secondary" onClick={onSave}>
              Save as draft
            </Button>
          </div>

          <Button onClick={onPublish}>
            Publish
          </Button>
        </Actions>
      </div>
    </Fragment>
  )
}

Editor.defaultProps = {
  isNew: true,
  title: "",
  text: "",
  onRemove: noop
}

export default Editor
