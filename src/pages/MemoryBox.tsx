import React, { useState } from 'react';
import ScrapbookCard from '../components/ScrapbookCard';

interface MemoryItem {
  id: number;
  type: 'photo' | 'ticket' | 'note' | 'screenshot';
  title: string;
  description: string;
  imageUrl?: string;
  date: string;
  color: string;
}

const memoryItems: MemoryItem[] = [
  {
    id: 1,
    type: 'ticket',
    title: 'Concert Tickets',
    description: 'Our first concert together. You sang all the songs even though you claimed not to know them.',
    imageUrl: 'https://images.pexels.com/photos/2078071/pexels-photo-2078071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'March 15, 2024',
    color: 'bg-yellow-100'
  },
  {
    id: 2,
    type: 'photo',
    title: 'Beach Day',
    description: 'That spontaneous trip to the beach. We got sunburned but it was worth it.',
    imageUrl: 'https://images.pexels.com/photos/1533720/pexels-photo-1533720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'July 7, 2024',
    color: 'bg-blue-100'
  },
  {
    id: 3,
    type: 'note',
    title: 'First Love Note',
    description: 'The little sticky note you left on my laptop. I still have it.',
    date: 'April 2, 2024',
    color: 'bg-pink-100'
  },
  {
    id: 4,
    type: 'screenshot',
    title: 'Late Night Texts',
    description: 'When we stayed up until 3am texting about our dreams and fears.',
    date: 'February 20, 2024',
    color: 'bg-purple-100'
  },
  {
    id: 5,
    type: 'photo',
    title: 'Cooking Disaster',
    description: 'Attempt #1 at making lasagna together. The kitchen was a mess but we laughed so hard.',
    imageUrl: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'May 12, 2024',
    color: 'bg-red-100'
  },
  {
    id: 6,
    type: 'ticket',
    title: 'Movie Night',
    description: 'Our 10th movie date. You finally agreed to watch my favorite film.',
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'August 30, 2024',
    color: 'bg-indigo-100'
  }
];

const MemoryBox: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [boxOpen, setBoxOpen] = useState(false);
  
  const openBox = () => {
    setBoxOpen(true);
  };
  
  const viewMemory = (memory: MemoryItem) => {
    setSelectedMemory(memory);
  };
  
  const closeMemory = () => {
    setSelectedMemory(null);
  };
  
  const getMemoryIcon = (type: string) => {
    switch (type) {
      case 'photo': return '📸';
      case 'ticket': return '🎟️';
      case 'note': return '📝';
      case 'screenshot': return '📱';
      default: return '💌';
    }
  };
  
  return (
    <div className="w-full h-full flex flex-col bg-[url('https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center p-8 rounded-lg overflow-hidden shadow-xl">
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-white/70"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h2 className="font-handwriting text-4xl text-purple-600 text-center mb-8">
          Our Memory Box 📦
        </h2>
        
        {!boxOpen ? (
          <div className="w-64 h-64 mx-auto">
            <div 
              className="w-full h-full bg-amber-800 rounded-lg shadow-xl flex items-center justify-center cursor-pointer transform transition-all hover:scale-105 relative"
              onClick={openBox}
            >
              {/* Box lid */}
              <div className="absolute inset-0 bg-amber-700 rounded-t-lg h-1/3 flex items-center justify-center">
                <div className="w-12 h-6 bg-amber-900 rounded-md"></div>
              </div>
              
              <p className="font-handwriting text-white text-2xl mt-12">Click to open</p>
              
              {/* Box ribbon */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-pink-400"></div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto p-4">
            {memoryItems.map((memory) => (
              <div 
                key={memory.id}
                className="cursor-pointer transform transition-all hover:scale-105"
                onClick={() => viewMemory(memory)}
              >
                <ScrapbookCard bgColor={memory.color} rotation={Math.random() * 4 - 2}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">{getMemoryIcon(memory.type)}</div>
                    <h3 className="font-medium">{memory.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{memory.date}</p>
                  </div>
                </ScrapbookCard>
              </div>
            ))}
          </div>
        )}
        
        {/* Memory modal */}
        {selectedMemory && (
          <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={closeMemory}
          >
            <div 
              className="bg-white rounded-lg p-6 max-w-lg w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <span className="text-4xl">{getMemoryIcon(selectedMemory.type)}</span>
                <h3 className="text-2xl font-medium mt-2">{selectedMemory.title}</h3>
                <p className="text-sm text-gray-500">{selectedMemory.date}</p>
              </div>
              
              {selectedMemory.imageUrl && (
                <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={selectedMemory.imageUrl} 
                    alt={selectedMemory.title}
                    className="w-full h-48 object-cover" 
                  />
                </div>
              )}
              
              <p className="text-gray-700 font-handwriting text-lg leading-relaxed">
                {selectedMemory.description}
              </p>
              
              <button 
                className="mt-6 block mx-auto bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors"
                onClick={closeMemory}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryBox;