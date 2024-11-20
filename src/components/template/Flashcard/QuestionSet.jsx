import React, { useState } from "react";
import { Button, Alert } from "antd";
import "./Questionnaire.css";

const Questionnaire = ({ handleSubmitAll }) => {
  const questions = [
    {
      label: "Topic:",
      isInput: true,
      setter: (value) => value,
    },
    {
      label: "Level:",
      isSelect: true,
      options: [
        { value: "", label: "Select level" },
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
      ],
    },
    {
      label: "Number of Questions:",
      isInput: true,
      type: "number",
      min: 1,
      max: 10,
    },
  ];

  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [userInput, setUserInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentQuestion = questions[step];

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(`Question ${currentQuestion.label} changed to:`, value);
    setUserInput(value);
    setErrorMessage("");
  };

  const validateInput = () => {
    if (
      currentQuestion.isInput &&
      currentQuestion.min &&
      currentQuestion.type === "number"
    ) {
      if (userInput < currentQuestion.min || userInput > currentQuestion.max) {
        setErrorMessage(
          `Value must be between ${currentQuestion.min} and ${currentQuestion.max}.`
        );
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateInput()) {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [currentQuestion.label]: userInput,
      }));

      if (step < questions.length - 1) {
        setStep(step + 1);
        setUserInput("");
      } else {
        console.log("All questions answered. Responses:", {
          ...responses,
          [currentQuestion.label]: userInput,
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [currentQuestion.label]: userInput,
      }));
      setStep(step - 1);
      setUserInput("");
    }
  };

  const isLastStep = step === questions.length - 1;

  return (
    <div className="questionnaire-container">
      <div className="card">
        <h2 className="question-title">{currentQuestion.label}</h2>
        {currentQuestion.isSelect ? (
          <select
            value={userInput}
            onChange={handleChange}
            required
            className="input-select"
          >
            {currentQuestion.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={currentQuestion.type || "text"}
            value={userInput}
            onChange={handleChange}
            min={currentQuestion.min}
            max={currentQuestion.max}
            required
            className="input-field3"
          />
        )}
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            className="error-alert"
          />
        )}
        <div className="button-group">
          {step > 0 && (
            <Button onClick={handleBack} className="back-button">
              Back
            </Button>
          )}
          {isLastStep ? (
            <Button
              onClick={() => {
                setResponses((prevResponses) => ({
                  ...prevResponses,
                  [currentQuestion.label]: userInput,
                }));
                handleSubmitAll({
                  ...responses,
                  [currentQuestion.label]: userInput,
                });
              }}
              type="primary"
              className="next-button"
            >
              Configure
            </Button>
          ) : (
            <Button onClick={handleNext} type="primary" className="next-button">
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
