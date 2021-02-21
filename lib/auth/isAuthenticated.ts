import applySession from "./applySession"

const isAuthenticated = <T>(ctx: T) => (
  applySession<T>(ctx).then(({user, cookie}) => (
    Boolean(user && user.id && cookie)
  ))
)

export default isAuthenticated
