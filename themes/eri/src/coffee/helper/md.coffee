Markdown = require "markdown-it"
hljs = require "highlight.js"

highlight = (string, lang) ->
  unless lang and hljs.getLanguage lang
    return "
      <pre class=\"hljs\">
        <code>#{md.utils.escapeHtml string}</code>
      </pre>
    "

  try
    return "
      <pre class=\"hljs\">
        <code>#{hljs.highlight(lang, string, true).value}</code>
      </pre>
    "
  catch err
    console.error err
    return

module.exports = md = new Markdown {breaks: on, linkify: on, highlight}
