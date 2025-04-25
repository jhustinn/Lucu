import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
}

interface ConfettiProps {
  duration?: number;
  count?: number;
  active?: boolean;
}

const colors = [
  '#FF9AA2', // Light pink
  '#FFB7B2', // Salmon
  '#FFDAC1', // Light orange
  '#E2F0CB', // Light green
  '#B5EAD7', // Mint
  '#C7CEEA', // Light blue
  '#F4BFDB', // Pink
];

const Confetti: React.FC<ConfettiProps> = ({ 
  duration = 5000, 
  count = 100,
  active = true
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(active);
  
  useEffect(() => {
    if (!isActive) return;
    
    // Generate confetti pieces
    const initialPieces: ConfettiPiece[] = Array.from({ length: count }, (_, i) => createPiece(i));
    setPieces(initialPieces);
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      setPieces(prevPieces => {
        return prevPieces
          .map(piece => ({
            ...piece,
            x: piece.x + piece.speedX,
            y: piece.y + piece.speedY,
            speedY: piece.speedY + 0.1, // gravity
            rotation: piece.rotation + piece.rotationSpeed,
          }))
          .filter(piece => piece.y < window.innerHeight + 100); // Remove pieces that have gone too far
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Auto-stop after duration
    if (duration !== Infinity) {
      const timerId = setTimeout(() => {
        cancelAnimationFrame(animationId);
        setIsActive(false);
      }, duration);
      
      return () => {
        clearTimeout(timerId);
        cancelAnimationFrame(animationId);
      };
    }
    
    return () => cancelAnimationFrame(animationId);
  }, [isActive, count, duration]);
  
  useEffect(() => {
    setIsActive(active);
  }, [active]);
  
  const createPiece = (id: number): ConfettiPiece => {
    return {
      id,
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100, // Start above the screen
      size: 5 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: -3 + Math.random() * 6,
      speedX: -2 + Math.random() * 4,
      speedY: 1 + Math.random() * 3,
    };
  };
  
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size * 0.4}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: 0.8,
            zIndex: 9999,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;