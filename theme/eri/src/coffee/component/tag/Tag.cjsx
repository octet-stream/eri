{Component, PropTypes} = React = require "react"

class Tag extends Component
  @propTypes = allowCreate: PropTypes.bool

  @defaultProps = allowCreate: no

  constructor: ->
    @state =
      current: ""
      showPanel: no
      suggested: []

  _getTags: ({target: {value}}) =>
    return @setState showPanel: no, current: "", suggested: [] unless value

    onResponsed = (res) -> do res.json

    onFullfiled = (suggested) =>
      console.log suggested
      @setState {current: value, suggested, showPanel: yes}

    onRejected = (err) -> console.error err

    fetch "/tags/#{value}", headers: "X-Requested-With": "XmlHttpRequest"
      .then onResponsed
      .then onFullfiled
      .catch onRejected

  render: ->
    <div className="tag-container">
      <div className="tag-field">
        <input
          type="text" placeholder="Type tag here..."
          value={@state.current} onChange={@_getTags}
        />
      </div>
    </div>

module.exports = Tag
