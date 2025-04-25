import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrapbookCard from '../components/ScrapbookCard';

interface LoveNote {
  id: number;
  text: string;
  color: string;
  rotation: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const loveNotes: LoveNote[] = [
  {
    id: 1,
    text: "Suara Kamu 😊 Suara kamu jauh beda, aku ngga tau kenapa tenang and nyaman banget",
    color: "bg-yellow-100",
    rotation: 3,
    position: { top: "5%", left: "10%" }
  },
  {
    id: 2,
    text: "Kamu yang ngga pernah ngeluh dan semangatin aku kalo aku lagi kenapa-napa 🍳",
    color: "bg-pink-100",
    rotation: -2,
    position: { top: "15%", right: "8%" }
  },
  {
    id: 3,
    text: "Kamu selalu bisa mencari tahu aku sedang kenapa sayang 🔍",
    color: "bg-blue-100",
    rotation: 2,
    position: { top: "35%", left: "15%" }
  },
  {
    id: 4,
    text: "Kamu juga inget banyak hal kecil tentang aku ✨",
    color: "bg-purple-100",
    rotation: -3,
    position: { top: "25%", right: "12%" }
  },
  {
    id: 5,
    text: "Mental and Mindset kamu yang beda dan sama sama kaya aku 💪",
    color: "bg-green-100",
    rotation: 4,
    position: { top: "60%", left: "8%" }
  },
  {
    id: 8,
    text: "The feeling of your arms around me 🤗🫂",
    color: "bg-yellow-100",
    rotation: -4,
    position: { bottom: "25%", right: "15%" }
  },
];

const ThingsILove: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [hoveredNote, setHoveredNote] = useState<number | null>(null);
  
  const toggleNote = (id: number) => {
    if (selectedNote === id) {
      setSelectedNote(null);
    } else {
      setSelectedNote(id);
    }
  };
  
  return (
    <div className="w-full h-full bg-[url('https://images.pexels.com/photos/1166643/pexels-photo-1166643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center p-8 rounded-lg overflow-hidden shadow-xl">
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <motion.h2 
          className="font-handwriting text-4xl text-pink-600 text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hal Yang Aku Suka Tentang Kamu 💕
        </motion.h2>
        
        <div className="relative w-full h-[calc(100vh-12rem)] border-8 border-stone-700/10 rounded-lg overflow-hidden bg-cork bg-cover bg-center">
          {/* Corkboard background and texture */}
          <div className="absolute inset-0 bg-amber-800/30"></div>
          
          {/* Sticky notes */}
          <AnimatePresence>
            {loveNotes.map((note) => (
              <motion.div
                key={note.id}
                className="absolute"
                style={{
                  ...note.position,
                  zIndex: selectedNote === note.id ? 10 : hoveredNote === note.id ? 5 : 1,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <motion.div
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNote(note.id)}
                  onMouseLeave={() => setHoveredNote(null)}
                  onClick={() => toggleNote(note.id)}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: note.rotation + (Math.random() * 2 - 1),
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  <ScrapbookCard
                    bgColor={note.color}
                    rotation={note.rotation}
                    className="w-48 h-48 shadow-lg"
                    withTape={selectedNote === note.id}
                  >
                    <motion.div 
                      className="flex items-center justify-center h-full p-4"
                      initial={false}
                      animate={{
                        scale: selectedNote === note.id ? 1.1 : 1
                      }}
                    >
                      <p className="font-handwriting text-center text-gray-800 leading-relaxed">
                        {note.text}
                      </p>
                    </motion.div>
                  </ScrapbookCard>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Decorative pins */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 rounded-full shadow-sm ${
                i === 0 ? 'top-4 left-4 bg-red-500' :
                i === 1 ? 'top-4 right-4 bg-blue-500' :
                i === 2 ? 'bottom-4 left-4 bg-green-500' :
                'bottom-4 right-4 bg-yellow-500'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-4 left-0 right-0 text-center text-gray-600/70 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        Click on any note to make it pop! 💝
      </motion.div>
    </div>
  );
};

export default ThingsILove;