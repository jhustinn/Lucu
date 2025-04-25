import React, { useRef, useState } from 'react';
import { Play, Pause, Heart } from 'lucide-react';

const voiceNotes = [
  {
    id: 1,
    title: "HEHE HATI HATI YAHHHH ☀️",
    time: "7:01 AM",
    src: "../dist/assets/1.opus", // gunakan path yang valid relatif ke `public/`
  },
  {
    id: 2,
    title: "Semangat Ya Ganteng 🙀",
    time: "10:45 PM",
    src: "../dist/assets/4.opus",
  },
  {
    id: 3,
    title: "Ikuttt Nangis 🥹",
    time: "12:08 AM",
    src: "../dist/assets/3.opus",
  },
];

const VoiceNotes: React.FC = () => {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);

  const togglePlay = (id: number) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    if (audio.paused) {
      // pause audio lain yang sedang diputar
      audioRefs.current.forEach((a, index) => {
        if (a && index !== id) {
          a.pause();
        }
      });
      audio.play();
      setCurrentPlayingId(id);
    } else {
      audio.pause();
      setCurrentPlayingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-100 to-indigo-50 flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">
        🎧 Voice Notes Favorit Aku
      </h1>
      <p className="text-gray-500 mb-8 text-sm">Because your voice is my favorite sound</p>

      <div className="w-full max-w-md space-y-4">
        {voiceNotes.map((note, index) => (
          <div
            key={note.id}
            className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between transition hover:scale-[1.02]"
          >
            <div>
              <p className="font-semibold text-gray-700">{note.title}</p>
              <p className="text-xs text-gray-400">{note.time}</p>
            </div>

            <div className="flex gap-3 items-center">
              <button
                className="bg-purple-100 text-purple-600 p-2 rounded-full hover:bg-purple-200 transition"
                onClick={() => togglePlay(index)}
              >
                {currentPlayingId === index ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <audio
                ref={(el) => {
                  if (el) audioRefs.current[index] = el;
                }}
                src={note.src}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-10">Tap play to relive sweet memories 💖</p>
    </div>
  );
};

export default VoiceNotes;
