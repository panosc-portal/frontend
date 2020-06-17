import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ThemeContext} from './context/ThemeContext'
import {UserContext} from './context/UserContext'
import DocumentsPage from './pages/DocumentsPage'
import DocumentPage from './pages/DocumentPage'
import NavBar from './components/Navbar'
import Iframe from './pages/iframe/Iframe'
import GlobalStyle from './GlobalStyle'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import Instance from './components/instance'
import {Global, css} from '@emotion/core'
import {ThemeProvider, withTheme} from 'emotion-theming'
import normalize from 'normalize.css'
// import ThemeProvider from './context/themeProvider'
import theme from './theme/darkTheme'
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Open Sans:400,700', 'sans-serif']
  }
})

const App = () => {
  const {isAuthenticated} = useContext(UserContext)
  // const {darkTheme} = useContext(ThemeContext)
  document.documentElement.style.setProperty('--dist', '1rem')
  document.documentElement.style.setProperty('--dist-small', '0.5rem')
  document.documentElement.style.setProperty('--dist-smaller', '0.25rem')
  document.documentElement.style.setProperty('--dist-tiny', '0.125rem')
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={(theme) => ({
          body: {
            fontFamily: theme.fonts.body,
            backgroundColor: theme.colors.background[0],
            fontSize: theme.fontSizes[1]
          },
          normalize,
          a: {textDecoration: 'none'}
        })}
      />
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/" component={DocumentsPage} />
          <Route exact path="/documents" component={DocumentsPage} />
          <Route path="/documents/:documentId" component={DocumentPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route path="/instance/:instance" component={Iframe} />
          <Route exact path="/test" component={Instance} />
        </Switch>
      </main>
      {console.log((props) => props.theme.colors.background[1])}
    </ThemeProvider>
  )
}

export default App
