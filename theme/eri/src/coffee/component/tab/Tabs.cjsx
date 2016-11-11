{Component, PropTypes, cloneElement} = React = require "react"

class Tabs extends Component
  @propTypes =
    width: PropTypes.number.isRequired
    height: PropTypes.number.isRequired
    children: PropTypes.array.isRequired

  constructor: -> @state = show: no, active: 0

  componentWillMount: ->
    @setState show: if @props.width < 720 then yes else no

  componentWillReceiveProps: ({width}) ->
    @setState show: if width < 720 then yes else no

  _onClick: ({target: {dataset: {idx}}}) => @setState active: Number idx

  _calculateTitleWidth: (len) -> @props.width / len

  _getTabsHeadHeight: ->
    document.querySelector(".tab-head")?.offsetHeight

  _renderTitles: ->
    width = @_calculateTitleWidth @props.children.length
    for __tab, __k in @props.children
      <div
        key={__k}
        style={{width}}
        onClick={@_onClick} data-idx={__k}
        className="tab-title fl#{if __k is @state.active then ' active' else ''}"
      >{__tab.props.title}</div>

  _renderTabs: ->
    width = @_calculateTitleWidth @props.children.length
    for __tab, __k in @props.children
      cloneElement __tab, {
        key: __k, isShowingTitles: @state.show, width
        isActive: if __k is @state.active then yes else no
      }

  render: ->
    <div
      className="tab-container cf"
      style={height: (@props.height - do @_getTabsHeadHeight) or "100%"}
    >
      <div
        className="tab-head cf#{
          if @state.show is on then ' active' else ''
        }"
      >{do @_renderTitles}</div>
      <div className="tab-body cf">
        {do @_renderTabs}
      </div>
    </div>

module.exports = Tabs
