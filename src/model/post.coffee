{user, tag, post} = require "../core/server/model"

getMatchedTagsByName = (name) -> (
  await tag.findAll
    raw: on
    limit: 5
    attributes: ["name"]
    where:
      name:
        $like: "%#{decodeURI name}%"
) ? []

module.exports = {
  getMatchedTagsByName
}
