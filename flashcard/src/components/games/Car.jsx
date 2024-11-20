import React from 'react';
import carImage from '../../assets/car2.png'; // Ensure this path is correct
import './Car.css'; // Import styles

const Car = ({ position }) => {
    // Translate position into lane class (0: left, 1: right)
    const lanePosition = position === 0 ? 'left' : 'right';

    return (
        <div className={`car ${lanePosition}`}>
            <img src={carImage} alt="Car" className="car-image" />
        </div>
    );
};

export default Car;
