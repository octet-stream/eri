actionNew = (ctx) -> await ctx.render "post/new", title: "Add new post"

actionAdd = (ctx) -> await return

actionEdit = (ctx) -> await return

actionUpdate = (ctx) -> await return

actionRemove = (ctx) -> await return

module.exports = (r) ->
  r "/post/new"
    .get actionNew
    .post actionAdd

  r "/post/edit/:slug"
    .get actionEdit
    .put actionUpdate
    .delete actionRemove
