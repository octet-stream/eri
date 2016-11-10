{Component, PropTypes} = React = require "react"

class Tab extends Component
  @propTypes =
    title: PropTypes.string.isRequired
    children: PropTypes.element.isRequired
    isActive: PropTypes.bool

  render: ->
    <div
      className="tab-content fl#{
        if @props.isActive or not @props.isShowingTitles then ' active' else ''
      }"
      style={
        height: "100%"
        width: if @props.isShowingTitles then "100%" else @props.width
      }
    >{@props.children}</div>

module.exports = Tab
