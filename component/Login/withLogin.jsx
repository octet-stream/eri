import t from "prop-types"

import Login from "./Login"

function withLogin(Target) {
  function WithLogin(props) {
    const {isAuthenticated} = props

    return isAuthenticated ? <Target {...props} /> : <Login {...props} />
  }

  WithLogin.propTypes = {
    isAuthenticated: t.bool
  }

  WithLogin.defaultProps = {
    isAuthenticated: false
  }

  return WithLogin
}

export default withLogin