import React, { useState } from 'react';
import Polaroid from '../components/Polaroid';

interface Moment {
  id: number;
  imageUrl: string;
  caption: string;
  description: string;
}

const topMoments: Moment[] = [
  {
    id: 1,
    imageUrl: "../dist/assets/1.jpg",
    caption: "KITA BALIKAN 💞",
    description: "Inget 26 April 2024? Aku bilang mulai hari itu 😁."
  },
  {
    id: 2,
    imageUrl: "../dist/assets/2.jpg",
    caption: "Foto TER Lucu kita 😆",
    description: "Kita habis maen keluar, terus tiba tiba kita foto foto di depan rumah kamu."
  },
  {
    id: 3,
    imageUrl: "../dist/assets/6.jpg",
    caption: "Photo Box Pertama Kita 📸",
    description: "Ini hari yang sama juga waktu kita balikan.. Kenanganyaaa."
  },
  {
    id: 4,
    imageUrl: "../dist/assets/8.jpg",
    caption: "Photo Box Kedua Kita ✨",
    description: "Ini Jugaaa lucuu, HEHEHE."
  },
];

const TopMoments: React.FC = () => {
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);
  
  const openMoment = (moment: Moment) => {
    setSelectedMoment(moment);
  };
  
  const closeMoment = () => {
    setSelectedMoment(null);
  };
  
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-pink-100 to-orange-100 p-8 rounded-lg overflow-hidden shadow-xl">
      <h2 className="font-handwriting text-4xl text-pink-600 text-center mb-8">
        Momen Kitaa 📸
      </h2>
      
      <div className="flex-1 relative">
        {/* Grid of polaroids */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {topMoments.map((moment, index) => (
            <div key={moment.id} className="flex items-center justify-center">
              <Polaroid
                imageUrl={moment.imageUrl}
                caption={moment.caption}
                rotation={(index % 3) * 2 - 2}
                onClick={() => openMoment(moment)}
              />
            </div>
          ))}
        </div>
        
        {/* Modal for expanded view */}
        {selectedMoment && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={closeMoment}>
            <div 
              className="bg-white rounded-lg p-6 max-w-lg w-full m-4 transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4">
                <Polaroid
                  imageUrl={selectedMoment.imageUrl}
                  caption={selectedMoment.caption}
                />
              </div>
              
              <p className="font-handwriting text-gray-700 text-center text-lg">
                {selectedMoment.description}
              </p>
              
              <button 
                className="mt-6 block mx-auto bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors"
                onClick={closeMoment}
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

export default TopMoments;