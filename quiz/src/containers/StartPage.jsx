import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";

function StartPage() {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="start-page">
      <h1 className="start-page__title">Welcome to the Quiz App</h1>
      <p className="start-page__description">
        Test your knowledge with this interactive quiz!
      </p>
      <button className="start-page__button" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default StartPage;
