import React, { useState } from 'react';
import './FlashCard.css'; // Ensure you import the CSS file

const FlashCard = ({ flashcards, onAnswer }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    const nextIndex = (currentCardIndex + 1) % flashcards.length;
    setCurrentCardIndex(nextIndex);
    onAnswer(); // Notify that the answer was handled
  };

  return (
    <div className="flashcard"> {/* Use the flashcard class from CSS */}
      <h2>Flashcard Learning</h2>
      <div>
        <h3>{flashcards[currentCardIndex].question}</h3>
        <p>{flashcards[currentCardIndex].answer}</p>
        <button onClick={handleNextCard}>Next</button>
      </div>
    </div>
  );
};

export default FlashCard;