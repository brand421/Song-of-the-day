import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Song from "./components/Song/Date";

function App() {
  return (
    <>
      <Home />
      <Date path="/date" />
    </>
  );
}

export default App;
