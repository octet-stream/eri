import Login from "./Login"

function withLogin(Target: any) {
  const WithLogin: React.FC<{isAuthenticated: boolean}> = props => {
    const {isAuthenticated} = props

    return isAuthenticated ? <Target {...props} /> : <Login {...props} />
  }

  WithLogin.defaultProps = {
    isAuthenticated: false
  }

  return WithLogin
}

export default withLogin
