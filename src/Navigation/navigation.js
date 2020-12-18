import React from 'react'

import {Link as RouterLink} from 'react-router-dom'
import styled from 'styled-components'

import {Image, Flex, Link, Box} from '../Primitives'
import ToggleThemeButton from '../Theme/toggleThemeButton'
import LoginLogoutButton from './loginLogoutButton'
import {useThemeStore} from '../App/stores'

const Navigation = () => {
  const isDark = useThemeStore(state => state.isDark)
  return (
    <Flex
      sx={{
        bg: 'nav',
        height: 'nav',
        alignItems: 'center',
        px: [1, 3, 3, 4],
      }}
    >
      <Box height={['22px']}>
        <img
          height="100%"
          alt="PaNOSC logo"
          src={!isDark ? '/logo_dark.png' : '/logo_light.png'}
        />
      </Box>
      <Link as={RouterLink} variant="nav" to="/"></Link>
      <Box mx="auto" />
      <ToggleThemeButton />
      <LoginLogoutButton />
    </Flex>
  )
}

export default Navigation

const S = {}

S.Flex = styled(Flex).attrs({
  bg: 'nav',
  height: 'nav',
})``
