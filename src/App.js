import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import DocumentsPage from "./pages/DocumentsPage";
import DocumentPage from "./pages/DocumentPage";
import NavBar from "./components/Navbar";
import Iframe from "./pages/iframe/Iframe";
import GlobalStyle from "./GlobalStyle";

const App = () => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <>
      <GlobalStyle dark={darkTheme} />
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/" component={DocumentsPage} />
          <Route exact path="/documents" component={DocumentsPage} />
          <Route path="/documents/:document" component={DocumentPage} />
          <Route exact path="/profile" component={DocumentsPage} />
          <Route exact path="/settings" component={DocumentsPage} />
          <Route exact path="/logout" component={DocumentsPage} />
          <Route path="/instance/:instance" component={Iframe} />
        </Switch>
      </main>
    </>
  );
};

export default App;
