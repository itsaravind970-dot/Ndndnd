
import React, { useState, useEffect, useRef } from 'react';
import { PasswordGate } from './components/PasswordGate';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { GiftCard } from './components/GiftCard';
import { CakeSection } from './components/CakeSection';
import { AppState } from './types';
import { playBirthdayAudio } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.LOCKED);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const [isPartyMode, setIsPartyMode] = useState(false);
  const cakeRef = useRef<HTMLDivElement>(null);

  const handleUnlock = () => {
    setState(AppState.UNLOCKED);
  };

  const handleOpenCard = async () => {
    setState(AppState.CARD_OPENED);
    // Trigger AI Voice
    try {
      await playBirthdayAudio("happy Birthday ra pukaaaaaaaaaa ❤️❤️😘");
    } catch (error) {
      console.error("Failed to play AI audio", error);
    }
    
    // Show the "Crazy Mode" button after the audio starts
    setTimeout(() => {
      setIsPartyMode(true);
    }, 3000);
  };

  const startTheCrazyPart = () => {
    // This is the "twist" - chaotic animations before the cake
    const body = document.body;
    body.style.animation = "shake 0.5s infinite";
    
    setTimeout(() => {
      body.style.animation = "";
      setShowScrollPrompt(true);
    }, 2500);
  };

  const scrollToCake = () => {
    cakeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-slate-900 text-white overflow-x-hidden transition-colors duration-500 ${showScrollPrompt ? 'bg-indigo-950' : ''}`}>
      {state === AppState.LOCKED && (
        <PasswordGate onCorrectPassword={handleUnlock} />
      )}

      {state !== AppState.LOCKED && (
        <div className="relative w-full">
          <CelebrationOverlay isExtra={showScrollPrompt} />
          
          {/* Section 1: Introduction */}
          <section className="h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 relative">
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
              HAPPY BIRTHDAY!
            </h1>
            
            {state === AppState.UNLOCKED && (
              <button
                onClick={handleOpenCard}
                className="group relative px-8 py-4 bg-white text-pink-600 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all hover:scale-110 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">🎁 Open Your Gift Card</span>
                <div className="absolute inset-0 bg-pink-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
            )}

            {state === AppState.CARD_OPENED && (
              <div className="flex flex-col items-center space-y-8 animate-fadeIn">
                <GiftCard />
                
                {isPartyMode && !showScrollPrompt && (
                  <button
                    onClick={startTheCrazyPart}
                    className="mt-4 px-6 py-3 bg-yellow-400 text-black rounded-xl font-black text-lg animate-bounce shadow-2xl hover:bg-yellow-300 transition-colors uppercase tracking-tighter"
                  >
                    🔥 Click for a Twist! 🔥
                  </button>
                )}
              </div>
            )}

            {showScrollPrompt && (
              <div 
                onClick={scrollToCake}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center animate-bounce transition-opacity duration-1000 z-50 bg-white/10 backdrop-blur-md px-6 py-4 rounded-full border border-white/20"
              >
                <span className="text-sm font-semibold uppercase tracking-widest mb-2 text-pink-300">Wait... There's more! Scroll Down</span>
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </section>

          {/* Section 2: Cake */}
          <section ref={cakeRef} className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-900 via-purple-900 to-pink-900/30">
            <CakeSection />
          </section>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); filter: hue-rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); filter: hue-rotate(90deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); filter: hue-rotate(180deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); filter: hue-rotate(270deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); filter: hue-rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;
