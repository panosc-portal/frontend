import React from 'react'

import styled from '@emotion/styled'
import css from '@styled-system/css'
import {Link as RouterLink} from 'react-router-dom'

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

S.Flex = styled(Flex)(
  css({
    bg: 'middleground',
    height: 'nav',
  })
)
