import React, {useContext} from 'react'

import {Link} from 'rebass/styled-components'

import SessionContext from './sessionContext'

const LoginLogoutButton = () => {
  const {bearer, logout} = useContext(SessionContext)
  const loginLink =
    'https://github.com/login/oauth/authorize?client_id=Iv1.b17443d260d190ec&scope=openid&response_type=code&response_mode=form_post'
  return (
    <>
      {bearer ? (
        <Link variant="nav" onClick={() => logout()}>
          Logout
        </Link>
      ) : (
        <Link variant="nav" href={loginLink}>
          Login
        </Link>
      )}
    </>
  )
}

export default LoginLogoutButton
