{Component, PropTypes} = React = require "react"

class Tab extends Component
  @propTypes =
    title: PropTypes.string.isRequired
    children: PropTypes.element.isRequired

  render: ->
    <div
      className="fl"
      style={height: "100%", width: "50%"}
    >
      {@props.children}
    </div>

module.exports = Tab
