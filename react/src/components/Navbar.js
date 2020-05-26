import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {TabContext} from '../context/TabContext'
import styled from 'styled-components'
import logo from '../icons/logoc.svg'
import {FiUser, FiLogOut, FiX} from 'react-icons/fi'
import ThemeSwitcher from './ThemeSwitcher'
import {withRouter} from 'react-router-dom'

const Navbar = (props) => {
  const {tabs, closeTab} = useContext(TabContext)

  return (
    <NavbarContainer>
      <NavLinkHome exact to={'/'}>
        <img src={logo} alt="Home" />
      </NavLinkHome>
      {tabs.map((tab) => (
        <NavLinkTabContainer
          key={tab._id}
          active={
            props.location.pathname === '/instance/' + tab._id ? true : false
          }
        >
          <NavLinkTab to={'/instance/' + tab._id}>{tab.name}</NavLinkTab>
          <FiX onClick={() => closeTab(tab)} />
        </NavLinkTabContainer>
      ))}
      <NavbarGap />
      <NavLinkIcon to={'/profile'}>
        <FiUser />
      </NavLinkIcon>
      <NavLinkIcon to={'/logout'}>
        <FiLogOut />
      </NavLinkIcon>
      <ThemeSwitcherStyled />
    </NavbarContainer>
  )
}

export default withRouter(Navbar)

const NavbarContainer = styled.nav`
  display: flex;
  flex-flow: row;
  background-color: var(--color-bg-1);
  height: 2rem;
  align-items: center;

  border-bottom: var(--dist-tiny) var(--color-bg-0) solid;
  & > a,
  & > div {
    color: var(--color-text);
    display: flex;
    align-self: stretch;
    align-items: center;
    height: 100%;
    padding: 0 1rem;
    &:hover {
      background-color: var(--color-bg-2);
    }
    &.active {
      background-color: var(--color-bg-0);
      outline: none;
    }
  }
`

const NavLinkHome = styled(NavLink)`
  width: 5rem;
  & > img {
    width: 100%;
    height: auto;
  }
`

const NavLinkTabContainer = styled.div`
  padding-right: 0.5rem;
  svg:hover {
    color: var(--color-link-hover);
  }
  background-color: ${(props) =>
    props.active ? 'var(--color-bg-0)' : 'var(--color-bg-1)'};
`

const NavLinkTab = styled(NavLink)`
  color: var(--color-text);
  margin-right: 0.25rem;
`

const NavbarGap = styled.span`
  margin-left: auto;
`

const NavLinkIcon = styled(NavLink)`
  font-size: 1.5rem;
`

const ThemeSwitcherStyled = styled(ThemeSwitcher)`
  font-size: 1.5rem;
  &:hover {
    color: var(--color-link-hover);
  }
`
