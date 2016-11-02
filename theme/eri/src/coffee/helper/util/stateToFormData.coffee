{isPlainObject, isArray, isEmpty} = require "lodash"

###
# Map given state object to form-data
#
# @param object state
#
# @return FormData instance
###
stateToFormData = (state) ->
  fd = new FormData

  ###
  # Append fields to FormData instance
  #
  # @param object|array field
  # @param string|null k
  ###
  append = (field, key = null) ->
    for own __k, __v of field
      __key = if key? then "#{key}[#{__k}]" else "#{__k}"
      if isArray(field) or isPlainObject(field)
        if isEmpty __v then append __v, __key else fd.append __key, __v
      else
        fd.append __key, __v

    return

  append state
  return fd

module.exports = stateToFormData
