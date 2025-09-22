import React, { useRef, useEffect, useState } from 'react';

const BALL_SIZE = 40;
const SQUARE_SIZE = 40;
const BOUNDS_HEIGHT = 320;
const BOUNDS_WIDTH = 320;
const START_Y = 0;
const GRAVITY = 0.9;
const BOUNCE = 0.75;

export default function BouncingBall() {
  const [ballPos, setBallPos] = useState({ x: BOUNDS_WIDTH / 2 - BALL_SIZE / 2, y: START_Y });
  const [ballVel, setBallVel] = useState({ x: 2, y: 2 });
  const [squarePos, setSquarePos] = useState({ x: 50, y: 50 });
  const [squareVel, setSquareVel] = useState({ x: 2.5, y: 3 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    function animate() {
      setBallPos(prev => {
        let nextY = prev.y + ballVel.y;
        let nextX = prev.x + ballVel.x;
        let newVelY = ballVel.y + GRAVITY;
        let newVelX = ballVel.x;
        if (nextY + BALL_SIZE > BOUNDS_HEIGHT) {
          nextY = BOUNDS_HEIGHT - BALL_SIZE;
          newVelY = -newVelY * BOUNCE;
        }
        if (nextY < 0) {
          nextY = 0;
          newVelY = -newVelY * BOUNCE;
        }
        if (nextX + BALL_SIZE > BOUNDS_WIDTH) {
          nextX = BOUNDS_WIDTH - BALL_SIZE;
          newVelX = -newVelX * BOUNCE;
        }
        if (nextX < 0) {
          nextX = 0;
          newVelX = -newVelX * BOUNCE;
        }
        setBallVel({ x: newVelX, y: newVelY });
        return { x: nextX, y: nextY };
      });
      setSquarePos(prev => {
        let nextY = prev.y + squareVel.y;
        let nextX = prev.x + squareVel.x;
        let newVelY = squareVel.y + GRAVITY;
        let newVelX = squareVel.x;
        if (nextY + SQUARE_SIZE > BOUNDS_HEIGHT) {
          nextY = BOUNDS_HEIGHT - SQUARE_SIZE;
          newVelY = -newVelY * BOUNCE;
        }
        if (nextY < 0) {
          nextY = 0;
          newVelY = -newVelY * BOUNCE;
        }
        if (nextX + SQUARE_SIZE > BOUNDS_WIDTH) {
          nextX = BOUNDS_WIDTH - SQUARE_SIZE;
          newVelX = -newVelX * BOUNCE;
        }
        if (nextX < 0) {
          nextX = 0;
          newVelX = -newVelX * BOUNCE;
        }
        setSquareVel({ x: newVelX, y: newVelY });
        return { x: nextX, y: nextY };
      });
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [ballVel.x, ballVel.y, squareVel.x, squareVel.y]);

  return (
    <div
      className="relative mx-auto mt-8 border border-gray-300 bg-gray-100 overflow-hidden rounded-lg"
      style={{ width: BOUNDS_WIDTH, height: BOUNDS_HEIGHT }}
    >
      {/* Green Bouncing Ball */}
      <div
        className="absolute bg-green-600 rounded-full shadow-lg"
        style={{
          width: BALL_SIZE,
          height: BALL_SIZE,
          left: ballPos.x,
          top: ballPos.y,
          transition: 'none',
        }}
      />
      {/* Bouncing Square */}
      <div
        className="absolute bg-blue-500 shadow-lg"
        style={{
          width: SQUARE_SIZE,
          height: SQUARE_SIZE,
          left: squarePos.x,
          top: squarePos.y,
          transition: 'none',
          borderRadius: 8,
        }}
      />
    </div>
  );
}
