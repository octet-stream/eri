import {FC, ComponentType} from "react"

import useViewer from "hook/useViewer"

import Login from "./Login"

function withLogin(Target: ComponentType) {
  const WithLogin: FC = props => {
    const viewer = useViewer()

    return viewer ? <Target {...props} /> : <Login />
  }

  WithLogin.defaultProps = {
    isAuthenticated: false
  }

  return WithLogin
}

export default withLogin
