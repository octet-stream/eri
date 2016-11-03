actionNew = (ctx) -> await ctx.render "post/new", title: "Add new post"

actionAdd = (ctx) ->

actionEdit = (ctx) ->

actionUpdate = (ctx) ->

actionRemove = (ctx) ->

module.exports = (r) ->
  r "/post/new"
    .get actionNew
    .post actionAdd

  r "/post/edit/:slug"
    .get actionEdit
    .put actionUpdate
    .delete actionRemove
