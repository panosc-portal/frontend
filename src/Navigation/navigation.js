import React from 'react'

import {Link as RouterLink} from 'react-router-dom'
import styled from 'styled-components'

import {Flex, Link, Box} from '../Primitives'
import ToggleThemeButton from '../Theme/toggleThemeButton'
import LoginLogoutButton from './loginLogoutButton'

const Navigation = ({sidebar, setSidebar}) => {
  return (
    <S.Flex>
      <Link as={RouterLink} variant="nav" to="/">
        PaNOSC
      </Link>
      <Box mx="auto" />
      {/* <Link as={RouterLink} variant="nav" to="/dashboard"> */}
      {/*   Dashboard */}
      {/* </Link> */}
      <S.SidebarControlls onClick={() => setSidebar('left')}>
        Left
      </S.SidebarControlls>
      <S.SidebarControlls onClick={() => setSidebar(false)}>
        Middle
      </S.SidebarControlls>
      <S.SidebarControlls onClick={() => setSidebar('right')}>
        Right
      </S.SidebarControlls>
      <Box mx="auto" />
      <ToggleThemeButton />
      <LoginLogoutButton />
    </S.Flex>
  )
}

export default Navigation

const S = {}

S.Flex = styled(Flex).attrs({
  bg: 'middleground',
  height: 'nav',
})``

S.SidebarControlls = styled(Link).attrs({
  variant: 'nav',
})`
  display: none;
  @media (max-width: ${({theme}) => theme.breakpoints[1]}) {
    display: block;
  }
`
