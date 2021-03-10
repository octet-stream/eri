import {spawn, Worker, Thread} from "threads"

/**
 * Compiles Markdown to HTML using remark and remark-html
 *
 * @param text
 */
async function toHtml(text: string): Promise<string> {
  const convert = await spawn(new Worker("./convert"))

  const result: string = await convert(text).then(({contents}) => contents)

  return Thread.terminate(convert).then(() => result)
}

export default toHtml
