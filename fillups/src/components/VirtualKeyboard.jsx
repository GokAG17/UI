import React, { useState, useEffect } from "react";
import "./VirtualKeyboard.css";

const VirtualKeyboard = ({ onKeyPress }) => {
  const keys = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "BACKSPACE",
    "ENTER",
  ];

  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);

  const handleKeyPress = (key) => {
    if (onKeyPress) {
      onKeyPress(key);
    }
  };

  useEffect(() => {
    if (keys.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % keys.length);
    }, 1500);

    return () => clearInterval(intervalId);
  }, [currentKeyIndex, keys, onKeyPress]);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (e.button === 0) {
        handleKeyPress(keys[currentKeyIndex]);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [currentKeyIndex, keys, onKeyPress]);

  return (
    <div className="virtual-keyboard">
      <div className="key-row">
        {keys.map((key, index) => (
          <button
            key={index}
            className={`key ${index === currentKeyIndex ? "active" : ""}`}
            onMouseDown={(e) => {
              console.log(`Mouse button pressed: ${e.button}`);

              if (e.button === 0) {
                handleKeyPress(key);
              }
            }}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
