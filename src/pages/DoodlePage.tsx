import React, { useState, useRef, useEffect } from 'react';

interface Doodle {
  id: number;
  element: React.ReactNode;
  position: { x: number; y: number };
  rotation: number;
  scale: number;
}

const doodleElements = [
  '❤️', '💕', '💖', '💘', '💓', '💗', '💞', 
  '✨', '⭐', '🌟', '☀️', '🌈', '☁️', 
  '☕', '🧁', '🍰', '🍩', '🍭', 
  '🐱', '🐶', '🦄', '🦋', '🐢',
  '😊', '😍', '🥰', '😘', '🤗', '😴',
  '📚', '🎬', '🎮', '🎵', '🎨', '📱',
  '🏠', '🚗', '✈️', '🏖️', '🌲', '🌻'
];

const DoodlePage: React.FC = () => {
  const [doodles, setDoodles] = useState<Doodle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create initial random doodles
    if (containerRef.current) {
      const initialDoodles: Doodle[] = [];
      
      for (let i = 0; i < 20; i++) {
        const randomElement = doodleElements[Math.floor(Math.random() * doodleElements.length)];
        const randomX = Math.random() * 90; // % of container width
        const randomY = Math.random() * 90; // % of container height
        const randomRotation = Math.random() * 60 - 30; // -30 to 30 degrees
        const randomScale = 0.8 + Math.random() * 1.5; // 0.8 to 2.3
        
        initialDoodles.push({
          id: i,
          element: randomElement,
          position: { x: randomX, y: randomY },
          rotation: randomRotation,
          scale: randomScale
        });
      }
      
      setDoodles(initialDoodles);
    }
  }, []);
  
  const addRandomDoodle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      const randomElement = doodleElements[Math.floor(Math.random() * doodleElements.length)];
      const randomRotation = Math.random() * 60 - 30;
      const randomScale = 0.8 + Math.random() * 1.5;
      
      setDoodles([
        ...doodles,
        {
          id: Date.now(),
          element: randomElement,
          position: { x, y },
          rotation: randomRotation,
          scale: randomScale
        }
      ]);
    }
  };
  
  return (
    <div className="w-full h-full flex flex-col bg-[url('https://images.pexels.com/photos/479453/pexels-photo-479453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center p-8 rounded-lg overflow-hidden shadow-xl">
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-white/80"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <h2 className="font-handwriting text-4xl text-pink-600 text-center mb-6">
          Our Doodle Page 🎨
        </h2>
        
        <div 
          ref={containerRef}
          className="flex-1 border-4 border-dashed border-pink-300 rounded-lg bg-white/50 relative overflow-hidden cursor-crosshair"
          onClick={addRandomDoodle}
        >
          {/* Existing doodles */}
          {doodles.map((doodle) => (
            <div
              key={doodle.id}
              className="absolute text-4xl transition-all duration-300 hover:scale-125"
              style={{
                left: `${doodle.position.x}%`,
                top: `${doodle.position.y}%`,
                transform: `translate(-50%, -50%) rotate(${doodle.rotation}deg) scale(${doodle.scale})`,
              }}
            >
              {doodle.element}
            </div>
          ))}
          
          {/* Instructions */}
          {doodles.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-handwriting text-2xl text-gray-400">Click anywhere to add doodles!</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center text-gray-600">
          Click anywhere on the canvas to add random doodles!
        </div>
      </div>
    </div>
  );
};

export default DoodlePage;