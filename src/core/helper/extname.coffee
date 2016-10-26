{extname} = require "path"

###
# Returns file extname without dot
#
# @param string filename
#
# @return string
###
module.exports = (filename = "") -> extname(filename)[1..]
