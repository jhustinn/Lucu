import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrapbookCard from './ScrapbookCard';

interface PolaroidProps {
  imageUrl: string;
  caption: string;
  rotation?: number;
  onClick?: () => void;
}

const Polaroid: React.FC<PolaroidProps> = ({ 
  imageUrl, 
  caption, 
  rotation,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  
  return (
    <motion.div 
      className={`${onClick ? 'cursor-pointer' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      <ScrapbookCard 
        withPolaroid 
        withShadow
        rotation={rotation}
      >
        <div className="polaroid relative">
          <div className="relative overflow-hidden">
            <motion.img 
              src={imageUrl} 
              alt={caption} 
              className="object-cover w-full h-full"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <AnimatePresence>
              {isHovered && <AnimatedSparkles />}
            </AnimatePresence>
          </div>
          
          <motion.div 
            className="absolute bottom-2 left-0 right-0 text-center"
            animate={{ y: isHovered ? -2 : 0 }}
          >
            <p className="font-handwriting text-white text-sm overflow-hidden">
              {caption}
            </p>
          </motion.div>
        </div>
      </ScrapbookCard>
    </motion.div>
  );
};

const AnimatedSparkles: React.FC = () => {
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute text-yellow-300 ${
            i === 0 ? 'top-2 left-2' :
            i === 1 ? 'bottom-2 right-2' :
            'top-1/2 right-1/3'
          }`}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, i % 2 === 0 ? 360 : -360, 0],
          }}
          transition={{ 
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          ✨
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Polaroid;