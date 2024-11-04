import React from "react";
import { useNavigate } from "react-router-dom";
import "./CompletePage.css";

const CompletePage = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="end-page">
      <h1>Congratulations!</h1>
      <p>You have completed the quiz.</p>
      <button onClick={handleRestart} className="restart-button">
        Restart Quiz
      </button>
    </div>
  );
};

export default CompletePage;
