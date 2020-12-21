import React, {useState} from 'react'

import css from '@styled-system/css'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

import {useNavigationStore, useThemeStore} from '../App/stores'
import {Image, Button, Flex, Box} from '../Primitives'
import ToggleThemeButton from '../Theme/toggleThemeButton'
import LoginLogoutButton from './loginLogoutButton'

const Navigation = () => {
  const isDark = useThemeStore(state => state.isDark)
  const sections = useNavigationStore(state => state.sections)
  const [showHamburger, setShowHamburger] = useState(false)

  const SectionLink = props => (
    <Flex
      sx={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize: 2,
        cursor: 'pointer',
        bg: props.active ? 'background' : 'nav',
        color: props.active ? 'text' : 'primary',
        textTransform: 'uppercase',
        px: 3,
        ':hover': {color: 'text', bg: 'background'},
      }}
      {...props}
    />
  )
  const HamburgerLink = props => (
    <Flex
      sx={{
        height: ['nav', 'nav', '100%'],
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize: 2,
        cursor: 'pointer',
        bg: props.active ? 'background' : 'nav',
        color: props.active ? 'text' : 'primary',
        textTransform: 'uppercase',
        ':hover': {color: 'text', bg: 'background'},
      }}
      {...props}
    />
  )

  const overrideHome = sections.find(s => s.overrideHome)

  const Hamburger = props => (
    <Button
      bg={showHamburger ? ['foreground'] : ['nav']}
      sx={{
        display: ['block', 'block', 'none'],
        textAlign: 'right',
        px: 2,
        height: '100%',
        ':hover': {bg: 'background'},
        outline: 'none',
      }}
      {...props}
      onClick={() => setShowHamburger(!showHamburger)}
    >
      |=|
    </Button>
  )
  const HamburgerContent = props => (
    <Box
      sx={{
        display: props.show ? ['flex'] : ['none', 'none', 'flex'],
        flexDirection: ['column', 'column', 'row'],
        position: ['fixed', 'fixed', 'static'],
        top: ['60px', '60px', 'unset'],
        left: [0, 0, 'unset'],
        width: ['100%', '100%', 'unset'],
        height: ['100%'],
        bg: 'foreground',
      }}
      onClick={() => setShowHamburger(!showHamburger)}
    >
      {props.children}
    </Box>
  )

  const Home = () => (
    <Box height={['20px']}>
      <Image
        height="100%"
        width="unset"
        alt="PaNOSC logo"
        src={!isDark ? '/logo_dark.png' : '/logo_light.png'}
      />
    </Box>
  )

  return (
    <Flex
      sx={{
        bg: 'nav',
        height: 'nav',
        alignItems: 'center',
      }}
    >
      {overrideHome ? (
        <SectionLink {...overrideHome}>
          <Home />
        </SectionLink>
      ) : (
        <SectionLink as={NavLink} exact={true} to="/">
          <Home />
        </SectionLink>
      )}
      {sections.map(section => {
        if (section.overrideHome) {
          return false
        }
        return (
          section.desktopView || (
            <SectionLink {...section}>
              {section.name.length > 15
                ? `${section.name.substring(0, 14)}...`
                : section.name}
            </SectionLink>
          )
        )
      })}
      <Box mx="auto" />
      <Hamburger />
      <HamburgerContent show={showHamburger}>
        <HamburgerLink>
          <ToggleThemeButton />
        </HamburgerLink>
        <HamburgerLink>
          <LoginLogoutButton />
        </HamburgerLink>
      </HamburgerContent>
    </Flex>
  )
}

export default Navigation
