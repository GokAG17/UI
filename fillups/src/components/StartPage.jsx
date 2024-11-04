import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

const StartPage = () => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate('/fill-up');
    };

    return (
        <div className="start-page">
            <h1>Welcome to the Quiz</h1>
            <p>Test your knowledge by filling in the blanks!</p>
            <button onClick={handleStartQuiz} className="start-button">Start Quiz</button>
        </div>
    );
};

export default StartPage;
