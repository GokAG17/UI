import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CompletedPage.css";

function CompletedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  const restartQuiz = () => {
    navigate("/");
  };

  return (
    <div className="completed-page">
      <h1 className="completed-page__title">Quiz Completed!</h1>
      {/* <p className="completed-page__score">
        You scored {score} out of {totalQuestions}.
      </p> */}
      <p className="completed-page__message">
        {score / totalQuestions >= 0.8
          ? "Great job! You have a solid understanding."
          : score / totalQuestions >= 0.5
          ? "Good effort! Keep practicing to improve."
          : "Don't worry! Review the material and try again."}
      </p>
      <button className="completed-page__button" onClick={restartQuiz}>
        Try Again
      </button>
    </div>
  );
}

export default CompletedPage;
