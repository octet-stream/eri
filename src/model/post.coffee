db = require "../core/database"
tag = db "tag", require "../core/database/schema/tag"
post = db "post", require "../core/database/schema/post"
user = db "user", require "../core/database/schema/user"

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
