import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import DocumentsPage from "./pages/DocumentsPage";
import DocumentPage from "./pages/DocumentPage";
import NavBar from "./components/Navbar";
import Iframe from "./pages/iframe/Iframe";
import GlobalStyle from "./GlobalStyle";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";

const App = () => {
  const { darkTheme } = useContext(ThemeContext);
  const sendDatasetToEnvironment = result => {
    const { draggableId, destination } = result;
    console.log(
      `Add dataset ${draggableId} to environment ${destination.droppableId}`
    );
    const url = "di";
    const data = {
      datasetId: draggableId,
      instanceId: destination.droppableId
    };
    axios.post("http://localhost:5000/" + url, data);
  };
  return (
    <>
      <GlobalStyle dark={darkTheme} />
      <DragDropContext>
        <NavBar />
      </DragDropContext>
      <DragDropContext onDragEnd={result => sendDatasetToEnvironment(result)}>
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
      </DragDropContext>
    </>
  );
};

export default App;
