import React from 'react'

import {useKeycloak} from '@react-keycloak/web'

import {Button} from '../Primitives'

const LoginLogoutButton = () => {
  const {keycloak} = useKeycloak()
  return (
    <>
      {keycloak.authenticated ? (
        <Button variant="nav" onClick={() => keycloak.logout()}>
          Logout
        </Button>
      ) : (
        <Button variant="nav" onClick={() => keycloak.login()}>
          Login
        </Button>
      )}
    </>
  )
}

export default LoginLogoutButton
