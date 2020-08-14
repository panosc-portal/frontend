import React from 'react'

import {Flex, Link, Box} from 'rebass/styled-components'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'

const Navigation = () => {
  return (
    <S.Flex>
      <Link as={RouterLink} variant="nav" to="/">
        PaNOSC
      </Link>
      <Box mx="auto" />
      <Link as={RouterLink} variant="nav" to="/dashboard">
        Dashboard
      </Link>
      <Link
        variant="nav"
        href="https://github.com/login/oauth/authorize?client_id=Iv1.b17443d260d190ec&scope=openid&response_type=code&response_mode=form_post"
      >
        Login
      </Link>
    </S.Flex>
  )
}

export default Navigation

const S = {}
S.Flex = styled(Flex)`
  background-color: ${props => props.theme.colors.gray};
`
