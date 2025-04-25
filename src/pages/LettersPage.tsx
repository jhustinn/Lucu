import React from 'react';

const LettersPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-[url('https://images.pexels.com/photos/4271568/pexels-photo-4271568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center">
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-white/80 z-0" />

      <div className="relative z-10 flex flex-col px-4 py-8 sm:px-8 overflow-y-auto min-h-screen">
        <h2 className="font-handwriting text-3xl sm:text-4xl text-red-500 text-center mb-6">
          Letters to Each Other 💌
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl w-full mx-auto">
          {/* My Letter */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 sm:p-6 shadow-md transform rotate-1 relative">
            <div className="absolute -top-3 -right-3 text-3xl">💕</div>

            <h3 className="font-handwriting text-xl sm:text-2xl text-pink-600 mb-4 text-center">My Letter to You</h3>

            <div className="space-y-4 font-handwriting text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>My dearest,</p>
              <p>
                As we celebrate our first year together, I wanted to take a moment to put into words what you mean to me.
                Before you, I never knew love could be this simple yet profound.
              </p>
              <p>
                You've shown me what it means to be truly seen and accepted. Your kindness, your humor, your heart – they've
                all become essential parts of my world. I love the way you listen, really listen, when I talk about my day.
                I love how you remember the smallest details about things that matter to me.
              </p>
              <p>
                This past year has been the most beautiful adventure. We've laughed until our sides hurt, held each other
                through difficult moments, and created countless memories I'll cherish forever.
              </p>
              <p>
                I don't know what the future holds, but I know I want to face it with you. Thank you for being my partner, my
                best friend, and the love that makes everything brighter.
              </p>
              <p>Here's to our first year – and to many, many more.</p>
              <p>All my love,</p>
              <p>Me 💖</p>
            </div>
          </div>

          {/* Their Letter (Future) */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 shadow-md transform -rotate-1 relative flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <div className="absolute -top-3 -left-3 text-3xl">✨</div>

            <div className="text-center">
              <h3 className="font-handwriting text-xl sm:text-2xl text-blue-600 mb-4">Their Reply</h3>

              <div className="p-6 sm:p-8 border-2 border-dashed border-blue-300 rounded-lg bg-white/60">
                <p className="font-handwriting text-blue-700 text-base sm:text-lg">
                  This space is for their words, whenever they're ready to write them...
                </p>
                <div className="mt-6 text-5xl sm:text-6xl">💌</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LettersPage;
