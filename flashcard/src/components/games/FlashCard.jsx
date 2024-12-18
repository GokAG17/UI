import React, { useState, useEffect } from "react";
import "./FlashCard.css"; // Ensure you import the CSS file

const FlashCard = ({ flashcards, onAnswer }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [styles, setStyles] = useState({
    questionBoxColor: "#fff",
    questionBoxSize: "18px",
    optionBoxColor: "#eee",
    optionBoxSize: "14px",
    fontColor: "#000",
    fontSize: "16px",
  }); 
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {

    const fetchStyles = async () => {
      try {
        const response = await fetch("/styling.json"); 
        if (!response.ok) {
          throw new Error("Failed to fetch styles");
        }
        const data = await response.json();
        setStyles(data);
      } catch (error) {
        console.error("Error fetching styles:", error);
      }
    };

    fetchStyles();
  }, []);

  useEffect(() => {
    const { question, answer } = flashcards[currentCardIndex];
    const message = `Question: ${question}. Answer: ${answer}.`;

    speakText(message);

    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentCardIndex, flashcards]);

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
      onAnswer(); 
    };

    synth.speak(utterance);
  };

  const handleNextCard = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const nextIndex = (currentCardIndex + 1) % flashcards.length;
    setCurrentCardIndex(nextIndex);
    onAnswer(); 
  };

  return (
    <div
      className="flashcard"
      style={{
        fontSize: styles.fontSize,
        color: styles.fontColor,
        backgroundColor: styles.optionBoxColor,
      }}
    >
      <h2>Flashcard Learning</h2>
      <div>
        <h3
          style={{
            backgroundColor: styles.questionBoxColor,
            fontSize: styles.questionBoxSize,
            color: styles.fontColor,
          }}
        >
          {flashcards[currentCardIndex].question}
        </h3>
        <p
          style={{
            backgroundColor: styles.optionBoxColor,
            fontSize: styles.optionBoxSize,
            color: styles.fontColor,
          }}
        >
          {flashcards[currentCardIndex].answer}
        </p>
        <button
          onClick={handleNextCard}
          disabled={isSpeaking} 
        >
          next
        </button>
      </div>
    </div>
  );
};

export default FlashCard;
