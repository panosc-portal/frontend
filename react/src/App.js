import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { UserContext } from "./context/UserContext"
import DocumentsPage from "./pages/DocumentsPage";
import DocumentPage from "./pages/DocumentPage";
import NavBar from "./components/Navbar";
import Iframe from "./pages/iframe/Iframe";
import GlobalStyle from "./GlobalStyle";
import LoginPage from "./pages/LoginPage"
import LogoutPage from "./pages/LogoutPage"

const App = () => {
  const { isAuthenticated } = useContext(UserContext)
  const { darkTheme } = useContext(ThemeContext);
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to={'/login'} />
    )} />
  )
  return (
    <>
      <GlobalStyle dark={darkTheme} />
      {isAuthenticated && <NavBar />}
      <main>
        <Switch>
          <PrivateRoute exact path="/" component={DocumentsPage} />
          <PrivateRoute exact path="/documents" component={DocumentsPage} />
          <PrivateRoute path="/documents/:document" component={DocumentPage} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/logout" component={LogoutPage} />
          <PrivateRoute path="/instance/:instance" component={Iframe} />
        </Switch>
      </main>
    </>
  );
};

export default App;
