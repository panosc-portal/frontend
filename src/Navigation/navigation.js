import React, {useState} from 'react'

import {NavLink} from 'react-router-dom'

import {useNavigationStore, useAppStore} from '../App/stores'
import {Image, Button, Flex, Box} from '../Primitives'
import ToggleThemeButton from '../Theme/toggleThemeButton'
import LoginLogoutButton from './loginLogoutButton'
import BurgerIcon from './menu.svg'

const Navigation = () => {
  const [isDark, desktopView] = useAppStore(state => [
    state.isDark,
    state.desktopView,
  ])
  const sections = useNavigationStore(state => state.sections)
  const [showBurger, setShowBurger] = useState(false)

  //Component refactor needed!
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
  const BurgerLink = props => (
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
        ':hover': {color: 'text'},
      }}
      {...props}
    />
  )

  const Burger = props => (
    <Button
      bg={showBurger ? ['foreground'] : ['nav']}
      sx={{
        display: ['block', 'block', 'none'],
        textAlign: 'right',
        py: 3,
        height: '100%',
        ':hover': {bg: !showBurger && 'background'},
        outline: 'none',
      }}
      {...props}
      onClick={() => setShowBurger(!showBurger)}
    >
      <img src={BurgerIcon} alt="Royal Cheese" height="25px" width="25px" />
    </Button>
  )
  const BurgerContent = props => (
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
      onClick={() => setShowBurger(!showBurger)}
    >
      {props.children}
    </Box>
  )

  const overrideHome = sections.find(s => s.overrideHome)

  const Home = () => (
    <Box height={['20px']}>
      <Image
        height="100%"
        width="unset"
        alt="PaNOSC logo"
        src={!isDark ? '/PaNOSC_logo_black.svg' : '/PaNOSC_logo_white.svg'}
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
          desktopView || (
            <SectionLink {...section}>
              {section.name.length > 15
                ? `${section.name.substring(0, 14)}...`
                : section.name}
            </SectionLink>
          )
        )
      })}

      <Box mx="auto" />

      <Burger />

      <BurgerContent show={showBurger}>
        <BurgerLink>
          <ToggleThemeButton />
        </BurgerLink>
        <BurgerLink>
          <LoginLogoutButton />
        </BurgerLink>
      </BurgerContent>
    </Flex>
  )
}

export default Navigation
