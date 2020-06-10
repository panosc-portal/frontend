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

const App = () => {
  const {isAuthenticated} = useContext(UserContext)
  const {darkTheme} = useContext(ThemeContext)
  // const PrivateRoute = ({component: Component, ...rest}) => (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       isAuthenticated ? <Component {...props} /> : <Redirect to={'/login'} />
  //     }
  //   />
  // )
  //

  // {isAuthenticated && <NavBar />}
  return (
    <>
      <GlobalStyle dark={darkTheme} />
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
    </>
  )
}

export default App
