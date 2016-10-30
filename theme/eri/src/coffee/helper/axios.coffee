axios = require 'axios'

module.exports = axios.create
  headers:
    'X-Requested-With': 'XmlHttpRequest'
