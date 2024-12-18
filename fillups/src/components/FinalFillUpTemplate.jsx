import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VirtualKeyboard from "./VirtualKeyboard";
import "./FinalTemplate.css";

const FinalFillUpTemplate = () => {
  const { state } = useLocation();
  const { topic, difficulty, numQuestions } = state || {};

  const [fillUpData, setFillUpData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const [questionBoxColor, setQuestionBoxColor] = useState("#ffffff");
  const [inputBoxColor, setInputBoxColor] = useState("#f0f0f0");
  const [fontColor, setFontColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("16px");
  const [buttonColor, setButtonColor] = useState("#007bff");
  const [buttonFontColor, setButtonFontColor] = useState("#ffffff");

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

  const fetchStylingValues = async () => {
    try {
      const response = await fetch("/styling.json");
      if (!response.ok) {
        throw new Error("Failed to load styling values");
      }
      const data = await response.json();
      setQuestionBoxColor(data.questionBoxColor);
      setInputBoxColor(data.inputBoxColor || "#ffffff");
      setFontColor(data.fontColor);
      setFontSize(data.fontSize);
      setButtonColor(data.buttonColor || "#007bff");
      setButtonFontColor(data.buttonFontColor || "#ffffff");
    } catch (error) {
      console.error("Error fetching styling values:", error);
    }
  };

  useEffect(() => {
    fetchFillUps();
    fetchStylingValues();
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

    setTimeout(() => {
      handleNextQuestion();
    }, 5000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < fillUpData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setFeedback("");
      setUserAnswer("");
    } else {
      navigate("/end");
    }
  };

  const handleKeyPress = (key) => {
    if (key === "BACKSPACE") {
      setUserAnswer((prevAnswer) => prevAnswer.slice(0, -1));
    } else if (key === "ENTER") {
      handleAnswerSubmit();
    } else {
      setUserAnswer((prevAnswer) => prevAnswer + key);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const currentFillUp = fillUpData?.[currentQuestionIndex] || null;

  return (
    <div className="quiz-container">
      <VirtualKeyboard onKeyPress={handleKeyPress} />

      <h1 className="quiz-title">Fill Ups</h1>
      <div
        className="question-box"
        style={{
          backgroundColor: questionBoxColor,
          color: fontColor,
          fontSize: fontSize,
        }}
      >
        <p className="question-text">{currentFillUp.question}</p>
        <input
          ref={inputRef}
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
          className="answer-input"
          style={{
            backgroundColor: inputBoxColor,
            color: fontColor,
            fontSize: fontSize,
          }}
        />
        <button
          onClick={handleAnswerSubmit}
          className={`submit-button ${!userAnswer ? "disabled" : ""}`}
          disabled={!userAnswer}
          style={{
            backgroundColor: buttonColor,
            color: buttonFontColor,
          }}
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
          <button
            className="next-button"
            onClick={handleNextQuestion}
            style={{
              backgroundColor: buttonColor,
              color: buttonFontColor,
            }}
          >
            {currentQuestionIndex < fillUpData.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalFillUpTemplate;
