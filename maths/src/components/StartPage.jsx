import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./StartPage.css"; // Import the CSS file

const StartPage = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/ship-selection");
  };

  return (
    <div className="startPageContainer">
      <h2>Math Game!</h2>
      <Button
        className="startPageButton"
        type="primary"
        size="large"
        onClick={startGame}
      >
        Start Game
      </Button>
    </div>
  );
};

export default StartPage;
