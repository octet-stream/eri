import {spawn, Worker, Thread} from "threads"

/**
 * Compiles Markdown to plain text using remark and strip-markdown
 */
async function toText(text: string): Promise<string> {
  const convert = await spawn(new Worker("./convert"))

  const result: string = await convert(text).then(({contents}) => contents)

  return Thread.terminate(convert).then(() => result)
}

export default toText
