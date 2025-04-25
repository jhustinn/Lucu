import React, { useEffect, useState } from 'react';
import Confetti from '../components/animations/Confetti';

const CoverPage: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    // Trigger confetti after a short delay for page load
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 p-8 rounded-lg overflow-hidden shadow-xl">
      {showConfetti && <Confetti count={150} duration={8000} />}
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 text-4xl rotate-12">✨</div>
      <div className="absolute bottom-8 right-8 text-4xl -rotate-12">🎀</div>
      <div className="absolute top-1/4 right-8 text-3xl rotate-6">❤️</div>
      <div className="absolute bottom-1/4 left-10 text-3xl -rotate-6">💖</div>
      
      {/* Main content */}
      <div className="relative bg-white rounded-lg shadow-lg p-10 w-full max-w-2xl transform rotate-1">
        <div className="absolute -top-5 right-10 w-16 h-8 bg-pink-200/80 rotate-6"></div>
        <div className="absolute -top-5 left-10 w-16 h-8 bg-purple-200/80 -rotate-3"></div>
        
        <h1 className="font-handwriting text-5xl sm:text-7xl text-pink-500 text-center mb-6 animate-fadeIn">
          1 Tahun Kita YEAY!
        </h1>
        
        <h2 className="font-handwriting text-xl sm:text-2xl text-purple-500 text-center mb-8 animate-fadeInDelay">
          1 Tahun Itu Nggak Lama 😁💞
        </h2>
        
        <div className="w-full max-w-md mx-auto h-64 rounded-lg overflow-hidden shadow-md mb-8 animate-fadeInDelay2">
          <img 
            src="../dist/assets/3.jpg" 
            alt="Couple holding hands" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <p className="font-serif text-lg text-center text-gray-700 italic animate-fadeInDelay3">
          "The best thing to hold onto in life is each other."
        </p>
        <p className="font-handwriting text-right text-gray-500 mt-2 animate-fadeInDelay3">— Audrey Hepburn</p>
      </div>
      
      <div className="mt-6 text-center text-white/80 text-sm animate-pulse">
        Scroll or tap the arrows to navigate our story
      </div>
    </div>
  );
};

export default CoverPage;