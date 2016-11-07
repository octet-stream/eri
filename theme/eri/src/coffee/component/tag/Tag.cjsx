{Component, PropTypes} = React = require "react"

class Tag extends Component
  constructor: ->
    @state =
      current: ""
      showPanel: no
      suggested: []

  render: -> <div>Foo</div>

module.exports = Tag
