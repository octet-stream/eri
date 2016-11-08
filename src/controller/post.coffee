post = require "../model/post"

NotFoundException = require "../core/error/NotFound"
BadRequestException = require "../core/error/BadRequest"
ForbiddenException = require "../core/error/Forbidden"

actionNew = (ctx) -> await ctx.render "post/new", title: "Add new post"

actionAdd = (ctx) -> await return

actionEdit = (ctx) -> await return

actionUpdate = (ctx) -> await return

actionRemove = (ctx) -> await return

actionTags = (ctx) ->
  {name, page} = ctx.params

  unless ctx.isXhr
    ctx.body = await post.getPostsByTagName name, page
    return

  ctx.body = await post.getMatchedTagsByName name

  await return

module.exports = (r) ->
  r "/post/new"
    .get actionNew
    .post actionAdd

  r "/post/edit/:slug"
    .get actionEdit
    .put actionUpdate
    .delete actionRemove

  r "/tags/:name/:page?"
    .get actionTags
