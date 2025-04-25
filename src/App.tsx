import React, { useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import PageFlip from './components/PageFlip';
import CoverPage from './pages/CoverPage';
import LoveTimeline from './pages/LoveTimeline';
import ThingsILove from './pages/ThingsILove';
import TopMoments from './pages/TopMoments';
import FuturePlans from './pages/FuturePlans';
import MemoryBox from './pages/MemoryBox';
import CuteThings from './pages/CuteThings';
import Nicknames from './pages/Nicknames';
import LettersPage from './pages/LettersPage';
import DoodlePage from './pages/DoodlePage';
import NextChapter from './pages/NextChapter';
import FloatingHearts from './components/animations/FloatingHearts';
import VoiceNotes from './pages/VoiceNotes';

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;

    if (!isMusicPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden flex flex-col items-center">
      <FloatingHearts />

      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className="bg-white/70 backdrop-blur-sm p-3 md:p-4 rounded-full shadow-md hover:bg-white/90 transition-all duration-300"
        >
          {isMusicPlaying ? (
            <Music size={24} className="text-pink-500" />
          ) : (
            <VolumeX size={24} className="text-gray-500" />
          )}
        </button>
      </div>

      <audio id="bgMusic" loop>
        <source
          src="https://cdn.pixabay.com/download/audio/2022/01/20/audio_d0c6ff1bab.mp3?filename=romantic-soundtrack-10737.mp3"
          type="audio/mpeg"
        />
      </audio>

      <div className="w-full max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <PageFlip>
          <CoverPage />
          <LoveTimeline />
          <ThingsILove />
          <TopMoments />
          <FuturePlans />
          <MemoryBox />
          <CuteThings />
          <VoiceNotes />
          <Nicknames />
          <LettersPage />
          <DoodlePage />
          <NextChapter />
        </PageFlip>
      </div>
    </div>
  );
}

export default App;
