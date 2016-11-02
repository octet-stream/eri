require "codemirror/mode/markdown/markdown"
# require "codemirror/keymap/sublime" # Broken

require "codemirror/addon/edit/matchbrackets"
require "codemirror/addon/edit/closebrackets"
require "codemirror/addon/edit/closetag"

Codemirror = require "react-codemirror"
{Component, PropTypes} = React = require "react"

md = require "helper/wrapper/md"
axios = require "helper/wrapper/axios"
winsize = require "helper/dom/winsize"

class PostEditor extends Component
  constructor: ->
    {width, height} = do winsize

    @state = {
      width
      height
      pageInitialTitle: document.title
      title: ""
      content: ""
      tags: []
    }

  componentWillMount: -> addEventListener "resize", @_resizeEditor

  _getUrl: -> "" # noop

  _submit: -> # noop?

  _renderPreview: -> __html: md.render @state.content

  ###
  # Resize editor on window "resize" event
  ###
  _resizeEditor: =>
    {width, height} = do winsize
    @setState {width, height}

  ###
  # Update page title and @state.title
  #
  # @param Event
  ###
  _updateTitle: ({target: {value}}) =>
    document.title = if value
      "#{value} - #{@state.pageInitialTitle}"
    else
      "#{@state.pageInitialTitle}"

    @setState title: value

  _updateContent: (content) => @setState {content}

  render: ->
    <div className="post-editor">
      <div className="post-editor-head">
        <input
          className="post-editor-title"
          type="text" value={@state.title}
          placeholder="Title" onChange={@_updateTitle}
          style={{width: @state.width - 78}}
        />
      </div>
      <div className="post-editor-area" style={height: @state.height - 92}>
        <div className="post-editor-field fl">
          <Codemirror
            name="content"
            value={@state.content}
            onChange={@_updateContent}
            options={
              mode: "markdown"
              tabSize: 2
              lineWrapping: on
              autoCloseTags: on
              matchBrackets: on
              cursorBlinkRate: 0
              autoCloseBrackets: on
            }
          />
        </div>
        <div
          className="post-editor-preview fl"
          dangerouslySetInnerHTML={do @_renderPreview}
        ></div>
      </div>
      <div className="post-editor-controls"></div>
    </div>

module.exports = PostEditor
