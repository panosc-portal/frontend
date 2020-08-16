import React from 'react'

import {Link as RouterLink} from 'react-router-dom'
import {Flex, Link, Box} from 'rebass/styled-components'
import styled from 'styled-components'

import LoginLogoutButton from '../Auth/loginLogoutButton'

const Navigation = toggle => {
  return (
    <S.Flex>
      <Link as={RouterLink} variant="nav" to="/">
        PaNOSC
      </Link>
      <Box mx="auto" />
      <Link as={RouterLink} variant="nav" to="/dashboard">
        Dashboard
      </Link>
      <Link variant="nav" onClick={() => toggle()}>
        toggle theme
      </Link>
      <LoginLogoutButton />
    </S.Flex>
  )
}

export default Navigation

const S = {}
S.Flex = styled(Flex)`
  background-color: ${props => props.theme.colors.gray};
`
