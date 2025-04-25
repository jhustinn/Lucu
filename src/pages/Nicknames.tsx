import React, { useState, useEffect } from 'react';
import ScrapbookCard from '../components/ScrapbookCard';

interface Nickname {
  id: number;
  nickname: string;
  story: string;
  color: string;
}

const nicknames: Nickname[] = [
  { id: 1, nickname: "Achii", story: "HEHE, Nama yang dulu aku kasih ke kamu karena nama kamu lucu :).", color: "bg-orange-100" },
  { id: 2, nickname: "Tyn Tyn", story: "Nama panggilan aku dari kamu yang kenangannya ngena banget ke aku, soalnya aku suka hal hal kecil.", color: "bg-pink-100" },
  { id: 3, nickname: "Ahjussii 😈", story: "Salah satu panggilan yang sangat sangat bahaya ya 😈.", color: "bg-red-300" },
  { id: 4, nickname: "Antikk", story: "Yaaaa, kamu mungkin belum tahu panggilan ini. Tapi ini panggilan yang dulu sering aku pake buat nick game. (Anyaaa Cantik) 🤭", color: "bg-blue-100" },
  { id: 5, nickname: "Acrhist!? 😜", story: "YEAA! Acrhist, New One OF ANYA. Akuu Ngga Sabar menunggu Achrist! 🤭", color: "bg-indigo-100" },
  // { id: 6, nickname: "Snuggle Bug", story: "Because you always find a way to be the little spoon, no matter what.", color: "bg-purple-100" },
  // { id: 7, nickname: "Giggles", story: "Your laugh is my favorite sound in the world.", color: "bg-green-100" },
  // { id: 8, nickname: "Koala", story: "You cling to me like a koala when you're sleepy. It's adorable.", color: "bg-red-100" }
];

const Nicknames: React.FC = () => {
  const [bubbles, setBubbles] = useState<(Nickname & { position: { x: number, y: number } })[]>([]);
  const [selectedBubble, setSelectedBubble] = useState<number | null>(null);

  useEffect(() => {
    const placedBubbles = nicknames.map((nickname, index) => ({
      ...nickname,
      position: {
        x: 20 + (index % 4) * 20 + Math.random() * 5,
        y: 20 + Math.floor(index / 4) * 30 + Math.random() * 5
      }
    }));
    setBubbles(placedBubbles);
  }, []);

  const toggleBubble = (id: number) => {
    setSelectedBubble(prev => (prev === id ? null : id));
  };

  return (
    <div className="relative w-full h-screen flex flex-col bg-gradient-to-br from-pink-100 to-purple-100 p-8 overflow-hidden">
      <h2 className="font-handwriting text-4xl text-pink-600 text-center mb-6">
      Nama Panggilan and Indside Jokes Kita 🤭
      </h2>

      <div className="flex-1 relative">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute transition-all duration-300"
            style={{
              left: `${bubble.position.x}%`,
              top: `${bubble.position.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: selectedBubble === bubble.id ? 20 : 10
            }}
            onClick={() => toggleBubble(bubble.id)}
          >
            <ScrapbookCard
              bgColor={bubble.color}
              className={`rounded-full w-24 h-24 flex items-center justify-center shadow-xl border border-white cursor-pointer hover:scale-105 transition-transform duration-300 ${selectedBubble === bubble.id ? 'scale-125' : ''}`}
            >
              <div className="text-center">
                <p className="font-handwriting font-bold text-base text-gray-700">{bubble.nickname}</p>
              </div>
            </ScrapbookCard>

            {selectedBubble === bubble.id && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-64 bg-white p-4 rounded-xl shadow-lg z-30">
                <p className="font-handwriting text-sm text-gray-600">{bubble.story}</p>
              </div>
            )}
          </div>
        ))}

        {/* Cute Doodles */}
        <div className="absolute bottom-6 right-6 text-4xl rotate-12">✏️</div>
        <div className="absolute top-6 right-6 text-3xl -rotate-6">🤣</div>
        <div className="absolute bottom-24 left-8 text-3xl rotate-12">😘</div>
        <div className="absolute top-1/3 left-4 text-4xl rotate-6">💕</div>
      </div>

      <div className="mt-6 text-center text-pink-600/80 text-sm">
        Click on a bubble to see the story behind each nickname
      </div>
    </div>
  );
};

export default Nicknames;
