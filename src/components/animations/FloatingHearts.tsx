import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const controls = useAnimation();
  
  useEffect(() => {
    // Generate initial hearts
    const initialHearts: Heart[] = Array.from({ length: 15 }, (_, i) => createHeart(i));
    setHearts(initialHearts);
    
    // Start the floating animation
    controls.start(i => ({
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 3,
        delay: i * 0.2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }));
    
    // Add a new heart every 2 seconds
    const intervalId = setInterval(() => {
      setHearts(prevHearts => {
        // Remove hearts that have gone too far up to prevent memory leaks
        const filteredHearts = prevHearts.filter(heart => heart.y > -20);
        const newHeart = createHeart(filteredHearts.length);
        return [...filteredHearts, newHeart];
      });
    }, 2000);
    
    return () => {
      clearInterval(intervalId);
      controls.stop();
    };
  }, []);
  
  const createHeart = (id: number): Heart => {
    return {
      id,
      x: Math.random() * 100,
      y: 110 + Math.random() * 20,
      size: 10 + Math.random() * 20, // Reduced max size for better performance
      speed: 0.2 + Math.random() * 0.3,
      opacity: 0.3 + Math.random() * 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: -1 + Math.random() * 2,
    };
  };
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {hearts.map((heart, index) => (
        <motion.div
          key={`${heart.id}-${index}`}
          custom={index}
          initial={{ 
            x: `${heart.x}%`,
            y: `${heart.y}%`,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: `${heart.x}%`,
            y: `${heart.y - 100}%`,
            opacity: [0, heart.opacity, 0],
            scale: [0, 1, 0],
            rotate: [0, heart.rotation]
          }}
          transition={{ 
            duration: 8,
            ease: "linear",
            times: [0, 0.1, 1]
          }}
          className="absolute"
          onAnimationComplete={() => {
            setHearts(prevHearts => prevHearts.filter(h => h.id !== heart.id));
          }}
        >
          <div 
            className="text-pink-400" 
            style={{ 
              fontSize: `${heart.size}px`,
              filter: 'drop-shadow(0 0 2px rgba(244, 114, 182, 0.5))'
            }}
          >
            ❤
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;