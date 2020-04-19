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

const App = () => {
  const { user } = useContext(UserContext)
  const { darkTheme } = useContext(ThemeContext);
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      user.username
        ? <Component {...props} />
        : <Redirect to={'/login'} />
    )} />
  )
  return (
    <>
      <GlobalStyle dark={darkTheme} />
      <NavBar />
      <main>
        <Switch>
          <PrivateRoute exact path="/" component={DocumentsPage} />
          <Route exact path="/documents" component={DocumentsPage} />
          <Route path="/documents/:document" component={DocumentPage} />
          <Route exact path="/profile" component={DocumentsPage} />
          <Route exact path="/settings" component={DocumentsPage} />
          <Route exact path="/logout" component={DocumentsPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/instance/:instance" component={Iframe} />
        </Switch>
      </main>
    </>
  );
};

export default App;
