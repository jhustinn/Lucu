import React, { useEffect, useState } from 'react';

interface Lantern {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  delay: number;
}

const NextChapter: React.FC = () => {
  const [lanterns, setLanterns] = useState<Lantern[]>([]);
  
  useEffect(() => {
    // Create initial floating lanterns
    const initialLanterns: Lantern[] = Array.from({ length: 7 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80, // % of container width
      y: 110 + Math.random() * 30, // start below the screen
      speed: 0.1 + Math.random() * 0.2,
      size: 30 + Math.random() * 30,
      delay: Math.random() * 2000,
    }));
    
    setLanterns(initialLanterns);
    
    // Animation loop
    const animate = () => {
      setLanterns(prevLanterns => {
        return prevLanterns.map(lantern => ({
          ...lantern,
          y: lantern.y - lantern.speed,
        })).filter(lantern => lantern.y > -20); // Remove lanterns that have gone off screen
      });
      
      requestAnimationFrame(animate);
    };
    
    const timeoutIds = lanterns.map(lantern => 
      setTimeout(() => requestAnimationFrame(animate), lantern.delay)
    );
    
    // Add a new lantern every 3 seconds
    const intervalId = setInterval(() => {
      setLanterns(prevLanterns => {
        const newLantern = {
          id: Date.now(),
          x: 10 + Math.random() * 80,
          y: 110 + Math.random() * 10,
          speed: 0.1 + Math.random() * 0.2,
          size: 30 + Math.random() * 30,
          delay: 0,
        };
        return [...prevLanterns, newLantern];
      });
    }, 3000);
    
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
      clearInterval(intervalId);
    };
  }, []);
  
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-indigo-900 to-purple-900 p-8 rounded-lg overflow-hidden shadow-xl relative">
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className={`absolute bg-white rounded-full ${
              Math.random() > 0.5 ? 'animate-twinkle' : 'animate-twinkle-delay'
            }`}
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>
      
      {/* Floating lanterns */}
      {lanterns.map((lantern) => (
        <div
          key={lantern.id}
          className="absolute pointer-events-none"
          style={{
            left: `${lantern.x}%`,
            top: `${lantern.y}%`,
            transform: `translateX(-50%)`,
            transition: 'top 0.1s linear',
          }}
        >
          <div 
            style={{ width: `${lantern.size}px`, height: `${lantern.size * 1.5}px` }}
            className="relative"
          >
            <div className="absolute inset-0 bg-orange-400 rounded-t-full opacity-30 animate-glow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span role="img" aria-label="Lantern" style={{ fontSize: `${lantern.size * 0.7}px` }}>
                🏮
              </span>
            </div>
          </div>
        </div>
      ))}
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h2 className="font-handwriting text-5xl mb-6 text-pink-300">
          The Next Chapter ✨
        </h2>
        
        <div className="max-w-xl">
          <p className="text-xl mb-6 leading-relaxed">
            One year down, forever to go. Our story is just beginning, and the best chapters are yet to be written.
          </p>
          
          <p className="text-lg mb-8 leading-relaxed">
            Thank you for the most magical year of my life. For every laugh, every adventure, every quiet moment together.
          </p>
          
          <div className="text-2xl font-handwriting text-pink-300 mb-4">
            I love you more than words can say.
          </div>
          
          <div className="mt-6 space-y-3">
            <p className="text-lg">
              With all my heart,
            </p>
            <p className="font-handwriting text-2xl text-pink-200">
              Me 💖
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextChapter;