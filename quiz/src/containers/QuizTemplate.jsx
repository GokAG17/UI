import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./QuizTemplate.css";

const FinalTemplate = () => {
  const { state } = useLocation();
  const { questionBoxColor, optionBoxColor, fontColor, fontSize } = state || {};
  const navigate = useNavigate();

  const [mcqData, setMcqData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [highlightedOption, setHighlightedOption] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);

  const fetchMCQs = async () => {
    try {
      const response = await fetch("/mcqData.json");
      if (!response.ok) {
        throw new Error("Failed to load MCQs data");
      }
      const data = await response.json();
      setMcqData(data.questions);
      if (data.questions.length > 0) {
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setScore(0);
        setFeedback("");
      }
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    }
  };

  useEffect(() => {
    fetchMCQs();
  }, []);

  useEffect(() => {
    if (mcqData.length > 0 && quizStarted) {
      startJuggling();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentQuestionIndex, mcqData, quizStarted]);

  const startJuggling = () => {
    setHighlightedOption(0);

    if (intervalId) {
      clearInterval(intervalId);
    }

    const juggleInterval = setInterval(() => {
      setHighlightedOption((prevIndex) => {
        const newIndex =
          (prevIndex + 1) % mcqData[currentQuestionIndex].options.length;

        // Speak the highlighted option
        // const speech = new SpeechSynthesisUtterance(
        //   mcqData[currentQuestionIndex].options[newIndex]
        // );
        // window.speechSynthesis.speak(speech);
        return newIndex;
      });
    }, 3000);

    setIntervalId(juggleInterval);
  };

  const handleOptionClick = (option) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(option);
    speech.lang = "en-IN";
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);

    clearInterval(intervalId);
    if (option === mcqData[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(
        `Incorrect! The correct answer is: ${mcqData[currentQuestionIndex].correct_answer}`
      );
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 5000);
  };

  const handleLeftClick = () => {
    const selectedOption =
      mcqData[currentQuestionIndex].options[highlightedOption];
    handleOptionClick(selectedOption);
  };

  useEffect(() => {
    document.addEventListener("click", handleLeftClick);
    return () => {
      document.removeEventListener("click", handleLeftClick);
    };
  }, [highlightedOption, mcqData, currentQuestionIndex]);

  const handleNextQuestion = () => {
    setFeedback("");
    if (currentQuestionIndex < mcqData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      startJuggling();
    } else {
      // Navigate to results page with score data after confirming last question is answered
      navigate("/completed", {
        state: { score, totalQuestions: mcqData.length },
      });
    }
  };

  if (!mcqData || mcqData.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading MCQs...</p>
      </div>
    );
  }

  const currentMCQ = mcqData[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div
        className="question-box"
        style={{
          backgroundColor: questionBoxColor,
          color: fontColor,
          fontSize,
        }}
      >
        <p>{currentMCQ.question}</p>
      </div>
      <div className="options-container">
        {currentMCQ.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(option)}
            className={`option-button ${
              highlightedOption === i ? "highlighted" : ""
            }`}
            style={{
              backgroundColor:
                highlightedOption === i ? "#d1e7dd" : optionBoxColor,
              color: fontColor,
              fontSize,
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <div
          className={`feedback-message ${
            feedback.includes("Correct") ? "correct" : ""
          }`}
        >
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default FinalTemplate;
