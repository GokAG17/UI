import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RacingGameWithLearning from "./components/Racing";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/racing" element={<RacingGameWithLearning />} />
      </Routes>
    </Router>
  );
};

export default App;