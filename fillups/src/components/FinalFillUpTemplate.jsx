import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FinalTemplate.css";

const FinalFillUpTemplate = () => {
  const { state } = useLocation();
  const { topic, difficulty, numQuestions, color, size, boxColor } =
    state || {};
  const [fillUpData, setFillUpData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const fetchFillUps = async () => {
    try {
      const response = await fetch("/fillInTheBlanks.json");
      const data = await response.json();

      if (response.ok) {
        setFillUpData(data.questions);
      } else {
        console.error(
          "Failed to fetch fill-in-the-blanks questions:",
          data.error
        );
      }
    } catch (error) {
      console.error("Error fetching fill-in-the-blanks questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFillUps();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestionIndex]);

  const handleAnswerSubmit = () => {
    const currentFillUp = fillUpData[currentQuestionIndex];
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentFillUp.answer.trim().toLowerCase();

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      setFeedback("Correct!");
    } else {
      setFeedback(`Incorrect! The correct answer is: ${currentFillUp.answer}`);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < fillUpData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setFeedback("");
      setUserAnswer("");
    } else {
      navigate("/end"); // Adjust the path to your end page route
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const currentFillUp = fillUpData?.[currentQuestionIndex] || null;

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Fill in the Blanks</h1>
      <div className="question-box" style={{ backgroundColor: boxColor }}>
        <p className="question-text">{currentFillUp.question}</p>
        <input
          ref={inputRef}
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
          className="answer-input"
        />
        <button
          onClick={handleAnswerSubmit}
          className={`submit-button ${!userAnswer ? "disabled" : ""}`}
          disabled={!userAnswer}
        >
          Submit
        </button>
      </div>
      {feedback && (
        <div className="feedback-container">
          <p
            className={`feedback-text ${
              feedback.includes("Correct") ? "correct" : "incorrect"
            }`}
          >
            {feedback}
          </p>
          <button className="next-button" onClick={handleNextQuestion}>
            {currentQuestionIndex < fillUpData.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalFillUpTemplate;
