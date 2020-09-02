import applySession from "./applySession"

/**
 * @param {import("next").GetServerSidePropsContext} ctx
 *
 * @return {boolean}
 */
const isAuthenticated = ctx => applySession(ctx).then(({user, cookie}) => (
  Boolean(user && user.id && cookie)
))

export default isAuthenticated
