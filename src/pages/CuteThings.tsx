import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'you';
  timestamp: string;
}

const messages: Message[] = [
  {
    id: 1,
    text: "Good morning! Just wanted to say that you make my heart do little flips every time I think about you 💓",
    sender: "you",
    timestamp: "8:32 AM"
  },
  {
    id: 2,
    text: "Ahhhh you're too sweet! You're making me blush on my way to work 🙈",
    sender: "me",
    timestamp: "8:45 AM"
  },
  {
    id: 3,
    text: "I can't stop thinking about how cute you looked when you were focused on your book yesterday",
    sender: "you",
    timestamp: "11:20 AM"
  },
  {
    id: 4,
    text: "Stop! I was just concentrating 😂 But seriously, seeing these messages from you makes my whole day",
    sender: "me",
    timestamp: "11:32 AM"
  },
  {
    id: 5,
    text: "You know what I was thinking about? How we have our own little language now. Like when I say 'beep boop' and you know exactly what I mean 🤖",
    sender: "you",
    timestamp: "4:15 PM"
  },
  {
    id: 6,
    text: "Beep boop = I love you but I'm too sleepy to say it 😴❤️",
    sender: "me",
    timestamp: "4:18 PM"
  },
  {
    id: 7,
    text: "Exactly! You get me like no one else. Meeting you was the luckiest day of my life.",
    sender: "you",
    timestamp: "4:20 PM"
  },
  {
    id: 8,
    text: "Before I met you, I never believed people when they talked about butterflies. But now I get it. Every. Single. Time. ✨",
    sender: "you",
    timestamp: "9:45 PM"
  },
  {
    id: 9,
    text: "You're going to make me cry happy tears! I'm so grateful for you every day ❤️",
    sender: "me",
    timestamp: "9:50 PM"
  },
];

const CuteThings: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  
  const toggleMessage = (id: number) => {
    if (selectedMessage === id) {
      setSelectedMessage(null);
    } else {
      setSelectedMessage(id);
    }
  };
  
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-lg overflow-hidden shadow-xl">
      <h2 className="font-handwriting text-4xl text-purple-600 text-center mb-6">
        Cute Things You Said 💬
      </h2>
      
      <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 overflow-hidden">
        {/* Phone-like interface */}
        <div className="h-full flex flex-col rounded-xl overflow-hidden border-4 border-gray-100">
          {/* Phone header */}
          <div className="bg-gray-100 p-3 text-center">
            <div className="font-medium text-gray-700">❤️ My Favorite Person ❤️</div>
            <div className="text-xs text-gray-500">Last active: Just now</div>
          </div>
          
          {/* Messages container */}
          <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-3 shadow-sm transition-all duration-300 cursor-pointer ${
                      selectedMessage === message.id 
                        ? 'scale-105' 
                        : 'scale-100 hover:scale-105'
                    } ${
                      message.sender === 'me' 
                        ? 'bg-purple-500 text-white rounded-tr-none' 
                        : 'bg-white rounded-tl-none'
                    }`}
                    onClick={() => toggleMessage(message.id)}
                  >
                    <p className={`${message.sender === 'me' ? 'text-white' : 'text-gray-800'}`}>
                      {message.text}
                    </p>
                    
                    <div className={`text-right text-xs mt-1 ${
                      message.sender === 'me' ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Phone footer */}
          <div className="bg-gray-100 p-3 flex items-center">
            <div className="flex-1 bg-white rounded-full px-4 py-2 text-gray-400">
              Message...
            </div>
            <button className="ml-2 bg-purple-500 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center">
              ❤️
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-purple-600/70 text-sm">
        Tap on any message to highlight it
      </div>
    </div>
  );
};

export default CuteThings;