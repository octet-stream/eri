{Component, PropTypes} = React = require "react"

class Tabs extends Component
  @propTypes = children: PropTypes.array.isRequired

  render: ->
    <div className="tabs-container cf" style={height: @props.height or "100%"}>
      {tab for tab in @props.children}
    </div>

module.exports = Tabs
