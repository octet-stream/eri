###
# Get size of document.documentElement
#
# @return object
###
docsize = ->
  {documentElement: {offsetWidth, offsetHeight}} = document
  return {width: offsetWidth, height: offsetHeight}

module.exports = docsize
