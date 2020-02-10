import React from "react";
import { Switch, Route } from "react-router-dom";
import Datasets from "./components/datasets";
import Dataset from "./components/dataset";
import Menu from "./components/menu";
import Footer from "./components/footer";

const App = () => {
  return (
    <>
      <nav>
        <Menu />
      </nav>
      <main>
        <Switch>
          <Route exact path="/" component={Datasets} />
          <Route exact path="/dataset/:number" component={Dataset} />
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
