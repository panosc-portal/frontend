import React from 'react'

import {Link as RouterLink} from 'react-router-dom'
import {Flex, Link, Box} from 'rebass/styled-components'
import styled from 'styled-components'

import LoginLogoutButton from '../Auth/loginLogoutButton'
import ToggleThemeButton from '../Theme/toggleThemeButton'

const Navigation = () => {
  return (
    <S.Flex>
      <Link as={RouterLink} variant="nav" to="/">
        PaNOSC
      </Link>
      <Box mx="auto" />
      {/* <Link as={RouterLink} variant="nav" to="/dashboard"> */}
      {/*   Dashboard */}
      {/* </Link> */}
      <ToggleThemeButton />
      <LoginLogoutButton />
    </S.Flex>
  )
}

export default Navigation

const S = {}
S.Flex = styled(Flex)`
  background-color: ${props => props.theme.colors.middleground};
`
