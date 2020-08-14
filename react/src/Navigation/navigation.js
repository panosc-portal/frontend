import React, {useContext} from 'react'

import {Link as RouterLink} from 'react-router-dom'
import {Flex, Link, Box} from 'rebass/styled-components'
import styled from 'styled-components'

import useFetch from '../App/useFetch'
import SessionContext from '../Auth/sessionContext'

const Navigation = () => {
  const {accessToken, setAccessToken, freshBearer} = useContext(SessionContext)
  const mockExpiration = () => {
    let expire = new Date()
    expire = new Date(expire.getTime() - 1000)
    setAccessToken({...accessToken, exp: expire})
    console.log('token out')
  }
  const [doFetch] = useFetch()
  const logout = async () => {
    await doFetch('/logout')
    localStorage.clear()
    setAccessToken()
  }
  return (
    <S.Flex>
      <Link as={RouterLink} variant="nav" to="/">
        PaNOSC
      </Link>
      <Link onClick={() => mockExpiration()}> {freshBearer}</Link>
      <Box mx="auto" />
      <Link as={RouterLink} variant="nav" to="/dashboard">
        Dashboard
      </Link>
      {localStorage.getItem('isAuthenticated') === 'true' ? (
        <Link variant="nav" onClick={() => logout()}>
          Logout
        </Link>
      ) : (
        <Link
          variant="nav"
          href="https://github.com/login/oauth/authorize?client_id=Iv1.b17443d260d190ec&scope=openid&response_type=code&response_mode=form_post"
        >
          Login
        </Link>
      )}
    </S.Flex>
  )
}

export default Navigation

const S = {}
S.Flex = styled(Flex)`
  background-color: ${props => props.theme.colors.gray};
`
