import React, { useState } from 'react';
import { Check, Clock } from 'lucide-react';

interface DreamItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
}

const dreamItems: DreamItem[] = [
  {
    id: 1,
    title: "Travel to Paris",
    description: "See the Eiffel Tower together and have a picnic on the Seine",
    icon: "✈️",
    completed: false
  },
  {
    id: 2,
    title: "Adopt a pet",
    description: "A fluffy companion to join our little family",
    icon: "🐶",
    completed: false
  },
  {
    id: 3,
    title: "Build a home together",
    description: "A cozy place that's all ours, with a garden and a reading nook",
    icon: "🏡",
    completed: false
  },
  {
    id: 4,
    title: "Learn to dance",
    description: "Take dance lessons so we can wow everyone at weddings",
    icon: "💃",
    completed: false
  },
  {
    id: 5,
    title: "Start a tradition",
    description: "Create our own special holiday or anniversary tradition",
    icon: "🎁",
    completed: true
  },
  {
    id: 6,
    title: "Plant a garden",
    description: "Grow our own vegetables and flowers together",
    icon: "🌱",
    completed: false
  },
  {
    id: 7,
    title: "Take cooking classes",
    description: "Learn to make amazing meals together",
    icon: "👨‍🍳",
    completed: true
  },
  {
    id: 8,
    title: "Wedding bells",
    description: "Someday, when the time is right...",
    icon: "💍",
    completed: false
  }
];

const FuturePlans: React.FC = () => {
  const [dreams, setDreams] = useState<DreamItem[]>(dreamItems);
  
  const toggleDream = (id: number) => {
    setDreams(dreams.map(dream => 
      dream.id === id ? { ...dream, completed: !dream.completed } : dream
    ));
  };
  
  // Calculate completion percentage
  const completedCount = dreams.filter(dream => dream.completed).length;
  const completionPercentage = (completedCount / dreams.length) * 100;
  
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-lg overflow-hidden shadow-xl">
      <h2 className="font-handwriting text-4xl text-teal-600 text-center mb-6">
        Future Plans Together 🌈
      </h2>
      
      {/* Progress bar */}
      <div className="mb-8 max-w-lg mx-auto w-full px-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">Our Dream Progress</span>
          <span className="font-medium text-teal-600">{completionPercentage.toFixed(0)}%</span>
        </div>
        <div className="h-4 bg-white rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-1000 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {dreams.map((dream) => (
            <div 
              key={dream.id}
              className={`bg-white rounded-lg p-4 shadow-md border-2 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                dream.completed ? 'border-teal-400 bg-teal-50/50' : 'border-gray-200'
              }`}
              onClick={() => toggleDream(dream.id)}
            >
              <div className="flex items-start">
                <div 
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-xl mr-3 ${
                    dream.completed ? 'bg-teal-100' : 'bg-blue-100'
                  }`}
                >
                  {dream.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className={`font-medium text-lg ${dream.completed ? 'text-teal-700' : 'text-gray-800'}`}>
                      {dream.title}
                    </h3>
                    
                    <div className="ml-auto">
                      {dream.completed ? (
                        <Check size={18} className="text-teal-600" />
                      ) : (
                        <Clock size={18} className="text-blue-400" />
                      )}
                    </div>
                  </div>
                  
                  <p className={`text-sm mt-1 ${dream.completed ? 'text-teal-600' : 'text-gray-600'}`}>
                    {dream.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-center text-teal-700/70 text-sm">
        Click on a dream to mark it complete or incomplete
      </div>
    </div>
  );
};

export default FuturePlans;