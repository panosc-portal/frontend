import React from 'react'

import {Link as RouterLink} from 'react-router-dom'
import styled from 'styled-components'

import {Flex, Link, Box} from '../Primitives'
import ToggleThemeButton from '../Theme/toggleThemeButton'
import LoginLogoutButton from './loginLogoutButton'

const Navigation = () => {
  return (
    <S.Flex>
      <Link as={RouterLink} variant="nav" to="/">
        PaNOSC
      </Link>
      <Box mx="auto" />
      <ToggleThemeButton />
      <LoginLogoutButton />
    </S.Flex>
  )
}

export default Navigation

const S = {}

S.Flex = styled(Flex).attrs({
  bg: 'nav',
  height: 'nav',
})``
