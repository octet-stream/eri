import html from "remark-html"
import remark from "remark"

const toHtml = remark().use(html)

/**
 * @param {{contents: string}} file
 */
const resolve = ({contents}) => contents

/**
 * @param {{text: string}} root
 * @param {{format: "md" | "html"}} args
 */
async function transformText({text}, {format}) {
  switch (format) {
    case "html":
      return toHtml.process(text).then(resolve)
    default:
      return text
  }
}

export default transformText
