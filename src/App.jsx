import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import Prompt from "./components/Prompt";
import Start from "./Start";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/" element={<Navbar />}>
          <Route path="home" element={<Home />} />  
          <Route path="prompt/:id" element={<Prompt/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
