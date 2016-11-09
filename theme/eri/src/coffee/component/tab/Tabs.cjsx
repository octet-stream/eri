{Component, PropTypes} = React = require "react"

class Tabs extends Component
  @propTypes = children: PropTypes.array.isRequired

  constructor: ->
    @state = showTitles: yes

  componentWillReceiveProps: ({width}) ->
    @setState showTitles: if width >= 720 then yes else no

  _renderTitles: ->
    for __tab, __k in @props.children
      <div key={__k} className="tabs-title">{__tab.props.title}</div>

  render: ->
    <div className="tabs-container cf" style={height: @props.height or "100%"}>
      <div
        className="tabs-header#{
          if @state.showTitles is on then ' active' else ''
        }"
      >{do @_renderTitles}</div>
      <div className="tabs-content">
        {@props.children}
      </div>
    </div>

module.exports = Tabs
