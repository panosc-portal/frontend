import React from 'react'

import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

import {Image, Link as RebassLink, Flex, Box} from '../Primitives'
import ToggleThemeButton from '../Theme/toggleThemeButton'
import LoginLogoutButton from './loginLogoutButton'
import {useNavigationStore, useThemeStore} from '../App/stores'
import css from '@styled-system/css'

const Navigation = () => {
  const isDark = useThemeStore(state => state.isDark)
  const sections = useNavigationStore(state => state.sections)

  const ItemWrapper = props => (
    <Flex
      sx={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {props.children}
    </Flex>
  )
  const Link = props => (
    <S.NavItem as={NavLink} {...props}>
      <ItemWrapper>{props.children}</ItemWrapper>
    </S.NavItem>
  )

  const Home = () => (
    <Link exact={true} to="/">
      <Box height={['20px']}>
        <Image
          height="100%"
          width="unset"
          alt="PaNOSC logo"
          src={!isDark ? '/logo_dark.png' : '/logo_light.png'}
        />
      </Box>
    </Link>
  )

  return (
    <Flex
      sx={{
        bg: 'nav',
        height: 'nav',
        alignItems: 'center',
      }}
    >
      <Home />
      {sections.map((section, index) => (
        <ItemWrapper key={index}>{section}</ItemWrapper>
      ))}
      <Box mx="auto" />
      <ToggleThemeButton />
      <LoginLogoutButton />
    </Flex>
  )
}

export default Navigation

export const S = {}

S.NavItem = styled(Box)(
  css({
    bg: 'nav',
    height: '100%',
    px: 3,
    '&.active': {
      bg: 'background',
    },
  })
)
