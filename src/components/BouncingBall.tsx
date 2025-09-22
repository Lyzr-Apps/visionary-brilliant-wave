import React, { useRef, useEffect, useState } from 'react';

const BALL_SIZE = 40;
const BOUNDS_HEIGHT = 320;
const BOUNDS_WIDTH = 320;
const START_Y = 0;
const GRAVITY = 0.9;
const BOUNCE = 0.75;

export default function BouncingBall() {
  const [pos, setPos] = useState({ x: BOUNDS_WIDTH / 2 - BALL_SIZE / 2, y: START_Y });
  const [vel, setVel] = useState({ x: 2, y: 2 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    function animate() {
      setPos(prev => {
        let nextY = prev.y + vel.y;
        let nextX = prev.x + vel.x;
        let newVelY = vel.y + GRAVITY;
        let newVelX = vel.x;

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

        setVel({ x: newVelX, y: newVelY });
        return { x: nextX, y: nextY };
      });
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [vel.x, vel.y]);

  return (
    <div
      className="relative mx-auto mt-8 border border-gray-300 bg-gray-100 overflow-hidden rounded-lg"
      style={{ width: BOUNDS_WIDTH, height: BOUNDS_HEIGHT }}
    >
      <div
        className="absolute bg-red-600 rounded-full shadow-lg"
        style={{
          width: BALL_SIZE,
          height: BALL_SIZE,
          left: pos.x,
          top: pos.y,
          transition: 'none',
        }}
      />
    </div>
  );
}
