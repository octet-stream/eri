Jade = require 'koa-jade'

{realpathSync} = require 'fs'
{app: {name, credits, theme}} = require '../helpers/configure-helper'
{version, codename} = require '../../package.json'

theme or= 'eri'
VIEWS = realpathSync "#{__dirname}/../../themes/#{do theme.toLowerCase}/views"
{NODE_ENV} = process.env
bIsDevel = unless NODE_ENV is 'production' then yes else no

jade = new Jade
  viewPath: VIEWS
  debug: bIsDevel
  pretty: bIsDevel
  noCache: bIsDevel
  locals:
    name: name
    credits: credits
    version: version
    codename: codename
    theme: theme

module.exports = (app) -> jade.use app
