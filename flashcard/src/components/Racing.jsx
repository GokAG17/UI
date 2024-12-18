import React, { useState, useEffect } from "react";
import Road from "./games/Road.jsx";
import Car from "./games/Car.jsx";
import Obstacles from "./games/Obstacles.jsx";
import Flashcard from "./games/FlashCard.jsx";
import "./Racing.css";

const RacingGameWithLearning = () => {
  const [carPosition, setCarPosition] = useState(0); // 0: left lane, 1: right lane
  const [flashcardVisible, setFlashcardVisible] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [flashcards, setFlashcards] = useState([]); // State for storing flashcards
  const [flashcardTimer, setFlashcardTimer] = useState(null); // Timer state

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch("/flashcards.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();

    // Cleanup timeout if component is unmounted
    return () => {
      if (flashcardTimer) {
        clearTimeout(flashcardTimer);
      }
    };
  }, [flashcardTimer]);

  const handleClick = () => {
    if (!isGamePaused) {
      setCarPosition((prevPosition) => (prevPosition === 0 ? 1 : 0)); // Move to the opposite lane
    }
  };

  const handleCollision = () => {
    // When the car collides with an obstacle, do nothing and let the game continue
    console.log("Collision detected! The game continues."); // Optional log for debugging
  };

  const handleMissedCoin = () => {
    console.log("Coin missed! Showing flashcard."); // Log to confirm it's triggered
    if (flashcards.length > 0) {
      const randomCard =
        flashcards[Math.floor(Math.random() * flashcards.length)];
      setCurrentFlashcard(randomCard);
      setFlashcardVisible(true); // Show flashcard on missed coin
      setIsGamePaused(true); // Pause the game when the flashcard appears

      // Set timer to close flashcard after 7 seconds
      const timer = setTimeout(() => {
        handleFlashcardCompletion();
      }, 7000); // 7000 milliseconds = 7 seconds
      setFlashcardTimer(timer); // Store the timer ID
    }
  };

  const handleFlashcardCompletion = () => {
    setFlashcardVisible(false);
    setIsGamePaused(false); // Resume the game after flashcard is completed
    if (flashcardTimer) {
      clearTimeout(flashcardTimer); // Clear the timer if the user manually completes the flashcard
    }
  };

  return (
    <div onClick={handleClick} className="rgl-game">
      <div className="rgl-background"></div>
      <Road isGamePaused={isGamePaused}>
        <Car position={carPosition} />
        <Obstacles
          carPosition={carPosition}
          onCollision={handleCollision} // No flashcard pop-up on collision
          onMissedCoin={handleMissedCoin} // Trigger flashcard on missed coin
          isGamePaused={isGamePaused}
        />
      </Road>
      {flashcardVisible && currentFlashcard && (
        <Flashcard
          flashcards={[currentFlashcard]}
          onAnswer={handleFlashcardCompletion}
        />
      )}
    </div>
  );
};

export default RacingGameWithLearning;
