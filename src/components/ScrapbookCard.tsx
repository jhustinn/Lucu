import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrapbookCardProps {
  children: ReactNode;
  className?: string;
  rotation?: number;
  bgColor?: string;
  withTape?: boolean;
  withShadow?: boolean;
  withPolaroid?: boolean;
  onClick?: () => void;
}

const ScrapbookCard: React.FC<ScrapbookCardProps> = ({
  children,
  className = '',
  rotation = 0,
  bgColor = 'bg-white',
  withTape = false,
  withShadow = true,
  withPolaroid = false,
  onClick,
}) => {
  // Generate random rotation if not specified
  const rotationDegree = rotation || Math.floor(Math.random() * 6) - 3;
  
  return (
    <motion.div 
      className={`relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 
                  ${withShadow ? 'shadow-lg' : ''} ${className}`}
      style={{ 
        transform: `rotate(${rotationDegree}deg)`,
      }}
      onClick={onClick}
      whileHover={onClick && { scale: 1.02 }}
      whileTap={onClick && { scale: 0.98 }}
      layout
    >
      {withTape && (
        <>
          <motion.div 
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-14 h-8 bg-yellow-100/70 rotate-3 z-10"
            animate={{
              rotate: [3, 5, 3],
              transition: { duration: 2, repeat: Infinity }
            }}
          />
          <motion.div 
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-14 h-8 bg-pink-100/70 -rotate-2 z-10"
            animate={{
              rotate: [-2, -4, -2],
              transition: { duration: 2, repeat: Infinity }
            }}
          />
        </>
      )}
      
      <motion.div 
        className={`${bgColor} ${withPolaroid ? 'p-2 pb-12' : 'p-4'} 
                    rounded-md relative overflow-hidden 
                    border border-gray-100 text-sm sm:text-base`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ScrapbookCard;
