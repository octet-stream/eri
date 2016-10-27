busboy = require "then-busboy"
mapFiles = require "../helper/upload/mapFiles"
{unlink} = require "promise-fs"

ALLOWED_TYPES = [
  "odt"
  "docx"
]

multipart = (ctx, next) ->
  return await do next unless ctx.get "multipart/*"

  data = await busboy ctx.req
  ctx.multipart = data

  await do next

  try
    await mapFiles data, ({path}) -> await unlink path
  catch err
    throw err unless err.code is "ENOENT"

module.exports = multipart
