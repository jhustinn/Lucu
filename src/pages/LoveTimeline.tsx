import React, { useState } from 'react';
import ScrapbookCard from '../components/ScrapbookCard';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: 'June 8, 2023',
    title: 'First Message',
    description: 'Waktu aku tanya "Nyaa Nomer seng lama kenapa?" 😁.',
    emoji: '💌',
    color: 'bg-pink-100',
  },
  {
    id: 2,
    date: 'June 26, 2023',
    title: 'First Date',
    description: 'Akuu ngajakin kamuu nonton Spider-man: Miles Morales EHEHE.',
    emoji: '☕',
    color: 'bg-yellow-100',
  },
  {
    id: 3,
    date: '...?, 2025',
    title: 'First Kiss 🤭',
    description: 'Under the stars, inside The Car.',
    emoji: '✨',
    color: 'bg-purple-100',
  },
  {
    id: 5,
    date: 'April 13, 2025',
    title: 'First Trip Together (Tapi Ngga Trip Jauh)',
    description: 'Kitaaa perjalanan jauuh dari rumah omaa :).',
    emoji: '🧳',
    color: 'bg-blue-100',
  },
  {
    id: 6,
    date: 'April 26, 2025',
    title: '1 Year Anniversary KITAA',
    description: 'Udah nggaa kerasa kita udah setahun aja ya sayangku 😁 I LOVE YOU SO MUCH!',
    emoji: '🎉',
    color: 'bg-green-100',
  },
];

const LoveTimeline: React.FC = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  
  const toggleEvent = (id: number) => {
    if (expandedEvent === id) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(id);
    }
  };
  
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-lg overflow-hidden shadow-xl">
      <h2 className="font-handwriting text-4xl text-purple-600 text-center mb-8">
        Love Timeline Kita 📆
      </h2>
      
      <div className="flex-1 overflow-y-auto pr-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-pink-300 transform -translate-x-1/2 rounded-full"></div>
          
          {/* Timeline events */}
          <div className="space-y-6 relative">
            {timelineEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`relative z-10 transition-all duration-500 ${
                  expandedEvent === event.id ? 'scale-105' : 'scale-100'
                }`}
              >
                {/* <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg absolute left-1/2 top-6 transform -translate-x-1/2 z-20 shadow-md ${event.color}`}
                >
                  {event.emoji}
                </div> */}
                
                <ScrapbookCard 
                  className={`w-5/6 max-w-xs mx-auto cursor-pointer ${
                    index % 2 === 0 ? 'ml-auto' : 'mr-auto'
                  }`}
                  bgColor={event.color}
                  rotation={index % 2 === 0 ? 2 : -2}
                  withTape
                  onClick={() => toggleEvent(event.id)}
                >
                  <div className="text-center">
                    <p className="font-mono text-xs text-gray-600">{event.date}</p>
                    <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${
                      expandedEvent === event.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-sm text-gray-700">{event.description}</p>
                    </div>
                    
                    <p className="text-xs mt-2 text-purple-500">
                      {expandedEvent === event.id ? 'Click to close' : 'Click to read more'}
                    </p>
                  </div>
                </ScrapbookCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveTimeline;