import React from 'react'

import {useKeycloak} from '@react-keycloak/web'

import {Link} from '../Primitives'

const LoginLogoutButton = () => {
  const {keycloak} = useKeycloak()
  return (
    <>
      {keycloak.authenticated ? (
        <Link variant="nav" onClick={() => keycloak.logout()}>
          Logout
        </Link>
      ) : (
        <Link variant="nav" onClick={() => keycloak.login()}>
          Login
        </Link>
      )}
    </>
  )
}

export default LoginLogoutButton
