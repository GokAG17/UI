// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Importing the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Car Racing Game with Learning!</h1>
        <Link to="/racing">
          <button className="start-button">Start Game</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
