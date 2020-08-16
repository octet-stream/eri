const compose = require("next-compose-plugins")
const gql = require("next-plugin-graphql")

module.exports = compose([
  [gql]
])
