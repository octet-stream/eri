###
# Get size of document.documentElement
#
# @return object
###
module.exports = ->
  {documentElement: {offsetWidth, offsetHeight}} = document
  return {width: offsetWidth, height: offsetHeight}
