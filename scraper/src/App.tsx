import React from 'react';
import Header from "./components/Header"
import Form from "./components/Form"
import './App.css';
const img = require("./one_hand_midd.JPG")

const App: React.FC = () => {
  return (
    <div className="App">
      <Header title="Roster Scraper" name="Matt Treiber" logo={img}/>
      <Form />
    </div>
  );
}

export default App;
