React = require "react"
{render} = require "react-dom"

PostAdd = require "./component/editor/PostAdd.coffee"

postAddNode = document.querySelector "#post-add"

render <PostAdd />, postAddNode if postAddNode?
