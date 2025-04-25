import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageFlipProps {
  children: React.ReactNode[];
}

const PageFlip: React.FC<PageFlipProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const totalPages = React.Children.count(children);
  const [dragDirection, setDragDirection] = useState<number>(0);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 700);
    }
  }, [currentPage, totalPages, isFlipping]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0 && !isFlipping) {
      setDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 700);
    }
  }, [currentPage, isFlipping]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx], direction: [dx], dragging, cancel }) => {
        if (isFlipping) {
          cancel();
          return;
        }

        if (dragging) {
          setDragDirection(dx > 0 ? -1 : 1);
        } else {
          if (Math.abs(mx) > 50) {
            if (dx > 0) {
              goToPrevPage();
            } else {
              goToNextPage();
            }
          }
          setDragDirection(0);
        }
      },
    },
    {
      drag: {
        threshold: 10,
        filterTaps: true,
        rubberband: true,
      },
    }
  );

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <motion.div
        {...bind()}
        className="w-full max-w-4xl h-[75vh] md:h-[80vh] lg:aspect-[4/3] relative cursor-grab active:cursor-grabbing"
        animate={{
          scale: isFlipping ? 0.9 : 1,
          rotate: isFlipping
            ? direction === 'next'
              ? 3
              : -3
            : dragDirection * 2,
          opacity: isFlipping ? 0.7 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {React.Children.map(
            children,
            (child, index) =>
              currentPage === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 w-full h-full"
                >
                  {child}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-20">
        <motion.button
          onClick={goToPrevPage}
          disabled={currentPage === 0 || isFlipping}
          className={`bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white/90 transition-all duration-300 ${
            currentPage === 0 || isFlipping
              ? 'opacity-50 cursor-not-allowed'
              : 'opacity-100'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={24} className="text-pink-500" />
        </motion.button>

        <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
          {currentPage + 1} / {totalPages}
        </div>

        <motion.button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1 || isFlipping}
          className={`bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white/90 transition-all duration-300 ${
            currentPage === totalPages - 1 || isFlipping
              ? 'opacity-50 cursor-not-allowed'
              : 'opacity-100'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={24} className="text-pink-500" />
        </motion.button>
      </div>

      {/* <div className="absolute bottom-24 left-0 right-0 text-center text-gray-500 text-sm">
        Swipe or use arrow keys to navigate
      </div> */}
    </div>
  );
};

export default PageFlip;
