import React, {useState, useEffect} from 'react'

import {useKeycloak} from '@react-keycloak/web'
import {NavLink} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

import {useNavigationStore, useAppStore} from '../App/stores'
import {Image, Button, Flex, Box} from '../Primitives'
import toggleTheme from '../Theme/toggleThemeButton'
import loginLogout from './loginLogoutButton'
import BurgerIcon from './menu.svg'

const Navigation = () => {
  const [isDark, isDesktop] = useAppStore(state => [
    state.isDark,
    state.isDesktop,
  ])
  const sections = useNavigationStore(state => state.sections)
  const [showBurger, setShowBurger] = useState(false)
  const {keycloak} = useKeycloak()

  useEffect(() => sections && setShowBurger(false), [sections, setShowBurger])

  //Component refactor needed!
  const SectionLink = props => (
    <Flex
      sx={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize: [0, 1],
        cursor: 'pointer',
        bg: props.active ? 'background' : 'nav',
        color: props.active ? 'text' : 'primary',
        borderRight: '2px solid',
        borderColor: 'background',
        fontWeight: 600,
        textTransform: 'uppercase',
        px: [1, 2, 3],
        ':hover': {color: 'text', bg: 'background'},
        '&.active': {bg: isDesktop && 'background'},
      }}
      {...props}
    />
  )

  const Burger = props => (
    <Button
      bg={showBurger ? ['foreground'] : ['nav']}
      sx={{
        textAlign: 'right',
        py: 3,
        height: '100%',
        ':hover': {bg: !showBurger && 'background'},
        outline: 'none',
      }}
      {...props}
      onClick={() => setShowBurger(!showBurger)}
    >
      <Image src={BurgerIcon} variant="navIcon" notWide />
    </Button>
  )
  const BurgerContent = props =>
    props.show && (
      <Flex
        sx={{
          flexDirection: 'column',
          position: 'fixed',
          left: 0,
          top: '60px',
          width: '100%',
          height: '100%',
          bg: 'foreground',
        }}
        onClick={() => setShowBurger(!showBurger)}
      >
        {props.children}
      </Flex>
    )
  const BurgerLink = props => (
    <Flex
      sx={{
        height: 'nav',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        fontSize: 2,
        cursor: 'pointer',
        bg: props.active ? 'background' : 'nav',
        color: props.active ? 'text' : 'primary',
        textTransform: 'uppercase',
        ':hover': {color: 'text'},
      }}
      {...props}
    >
      {props.name}
    </Flex>
  )

  const overrideHome = sections.find(s => s.overrideHome)
  const mainComponent = sections.find(s => s.main)

  const Home = () => (
    <Box height={'navIcon'} p={[1, 0]} onClick={() => mainComponent?.onClick()}>
      <Image
        height="100%"
        width="unset"
        alt="PaNOSC logo"
        src={
          keycloak.authenticated
            ? '/panosc_plain.svg'
            : !isDark
            ? '/PaNOSC_logo_black.svg'
            : '/PaNOSC_logo_white.svg'
        }
      />
    </Box>
  )
  const isHome = useLocation().pathname === '/'
  const Breadcrumb = () =>
    isHome ||
    (isDesktop && (
      <SectionLink {...mainComponent}>{mainComponent?.name}</SectionLink>
    ))

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
      <Breadcrumb />

      {sections.map(section => {
        return (
          isDesktop || (
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
        <BurgerLink {...toggleTheme()} />
        <BurgerLink {...loginLogout()} />
      </BurgerContent>
    </Flex>
  )
}

export default Navigation
