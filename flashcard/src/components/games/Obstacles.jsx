import React, { useEffect, useState } from "react";
import './Obstacles.css';

const Obstacles = ({ carPosition, onCollision, onMissedCoin, isGamePaused }) => {
    const [obstacles, setObstacles] = useState([]);

    // Function to generate a new obstacle
    const generateObstacle = () => {
        const lane = Math.floor(Math.random() * 2); // 0 for left, 1 for right
        setObstacles((prev) => [
            ...prev,
            {
                id: Date.now(),
                lane: lane,
                position: 0, // Start from the top
            },
        ]);
    };

    useEffect(() => {
        let interval;
        if (!isGamePaused) {
            interval = setInterval(generateObstacle, 7000); // New obstacle every 7 seconds
        }

        return () => clearInterval(interval);
    }, [isGamePaused]);

    useEffect(() => {
        const moveObstacles = () => {
            if (!isGamePaused) {
                setObstacles((prev) =>
                    prev
                        .map((obstacle) => ({
                            ...obstacle,
                            position: obstacle.position + 5, // Move down by 5px
                        }))
                        .filter((obstacle) => {
                            const carBottom = window.innerHeight - 150; // Adjust for car height
                            const obstacleBottom = obstacle.position; // Current position of the obstacle
                            
                            // Check for collision with the car
                            if (
                                obstacleBottom >= carBottom && // Collision threshold
                                obstacle.lane === carPosition
                            ) {
                                onCollision(); // Trigger collision event
                                return false; // Remove the obstacle from the state (it vanishes)
                            }

                            // Check if the obstacle has fully passed the bottom of the screen
                            if (obstacleBottom >= window.innerHeight) {
                                // If the obstacle has passed the bottom and missed the car
                                if (obstacle.lane !== carPosition) {
                                    onMissedCoin(); // Trigger missed coin event only for missed obstacles
                                }
                                return false; // Remove the obstacle from the state
                            }

                            // Keep the obstacle on screen if it hasn’t reached the bottom
                            return obstacleBottom < window.innerHeight;
                        })
                );
            }
        };

        const interval = setInterval(moveObstacles, 100); // Move every 100ms

        return () => clearInterval(interval);
    }, [carPosition, onCollision, onMissedCoin, isGamePaused]);

    return (
        <div>
            {obstacles.map((obstacle) => (
                <div
                    key={obstacle.id}
                    className={`obstacle ${obstacle.lane === 0 ? 'left' : 'right'}`}
                    style={{ top: `${obstacle.position}px` }}
                />
            ))}
        </div>
    );
};

export default Obstacles;