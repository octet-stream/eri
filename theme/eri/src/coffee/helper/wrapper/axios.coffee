# DEPRECATED!
# TODO: Consider to replace to window.fetch (with polyfill)
axios = require 'axios'

module.exports = axios.create headers: 'X-Requested-With': 'XmlHttpRequest'
