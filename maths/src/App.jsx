import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./components/StartPage.jsx";
import ShipSelection from "./components/ShipSelection.jsx";
import Setup from "./components/Setup.jsx";
import Game from "./components/Game.jsx";
import { SettingsProvider } from "./SettingsContext.jsx";
import { Layout } from "antd";
import "./styles.css";

const { Header, Content } = Layout;

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Layout className="app">
          <Content>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/ship-selection" element={<ShipSelection />} />
              <Route path="/game" element={<Game />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </SettingsProvider>
  );
}

export default App;
