// src/SettingsContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create a context for settings
const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [brightness, setBrightness] = useState(100); // Default brightness
  const [volume, setVolume] = useState(50); // Default volume
  const [fontSize, setFontSize] = useState(16); // Default font size

  return (
    <SettingsContext.Provider
      value={{ brightness, setBrightness, volume, setVolume, fontSize, setFontSize }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the SettingsContext
export const useSettings = () => useContext(SettingsContext);
