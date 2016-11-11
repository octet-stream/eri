{isEmpty, isArray} = require "lodash"
{user, tag, post, postTags} = require "../core/server/model"

NotFoundException = require "../core/error/NotFound"
BadRequestException = require "../core/error/BadRequest"
ForbiddenException = require "../core/error/Forbidden"

# Associate tags with posts
tag.belongsToMany post,
  foreignKey: "tag_id"
  through:
    model: postTags
    unique: no

post.belongsToMany tag,
  foreignKey: "post_id"
  through:
    model: postTags
    unique: no

# Associate users with posts
postUser = post.belongsTo user, foreignKey: "user_id"
userPost = user.belongsTo post, foreignKey: "user_id"

###
# @param string name
#
# @return array
###
getMatchedTagsByName = (name) ->
  tagsData = await tag.findAll
    raw: on
    limit: 5
    attributes: ["name"]
    where:
      name:
        $like: "%#{decodeURI name}%"

  return if isEmpty tagsData then [] else __tag.name for __tag in tagsData

###
# Get posts by tag name
#
# @param string name
# @param int page
#
# @return array
#
# @throws NotFoundException
###
getPostsByTagName = (name, page = 1) ->
  unless /^[0-9]+$/.test page
    throw new NotFoundException "Unknown format for page: #{page}"

  postsData = await post.findAll
    raw: on
    limit: 10 # 10 records per page
    offset: page * 10 - 9 # ...with offset 10 per page
    attributes:
      exclude: ["userId", "content"]
    include: [{
      model: tag
      attributes: []
      where: {name: decodeURI name}
    }, {
      model: user
      attributes: ["login"]
    }]

  if isEmpty postsData
    throw new NotFoundException "There is no posts with tag \"#{name}\"."

  for __post in postsData
    {postId} = __post
    postTagsData = await post.findAll
      raw: on
      include: [
        model: tag
        attributes: [
          "name"
        ]
      ]
      attributes: []
      where: {postId}

    __post.tags = (__tag["tags.name"] for __tag in postTagsData)

  return postsData

###
# Create new post
#
# @param string title
# @param string content
# @param string tags
#
# @throws BadRequestException
###
createPost = (title, content, tags, userId) ->

module.exports = {
  getMatchedTagsByName
  getPostsByTagName
}
