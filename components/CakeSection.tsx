
import React, { useState, useEffect, useRef } from 'react';

export const CakeSection: React.FC = () => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [intensity, setIntensity] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;
      source.connect(analyzerRef.current);
      
      setMicActive(true);
      detectBlow();
    } catch (err) {
      console.error("Microphone access denied", err);
      alert("I need microphone access to blow the candles!");
    }
  };

  const detectBlow = () => {
    if (!analyzerRef.current) return;
    
    const bufferLength = analyzerRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const check = () => {
      analyzerRef.current!.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      setIntensity(average);
      
      // Threshold for "blowing" - LOWERED to 35 for easier blowing
      if (average > 35) {
        setCandlesBlown(true);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        return;
      }
      
      animationFrameRef.current = requestAnimationFrame(check);
    };
    
    check();
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center w-full max-w-2xl">
      <div className="relative mb-24 transform scale-125 md:scale-150 transition-all duration-700">
        {/* The Cake */}
        <div className="relative w-64 h-48 bg-pink-100 rounded-t-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-b-8 border-pink-200 overflow-visible">
          {/* Frosting drips */}
          <div className="absolute top-0 left-0 right-0 flex justify-between px-2">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="w-10 h-16 bg-pink-100 rounded-full -mt-6 shadow-sm border-2 border-pink-50/20"></div>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-10 h-10 flex justify-center space-x-1">
             {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 rounded-full bg-pink-200"></div>)}
          </div>
          
          {/* Candles */}
          <div className="absolute -top-20 left-0 right-0 flex justify-center space-x-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="relative w-5 h-20 bg-gradient-to-b from-indigo-300 to-indigo-500 rounded-full border-2 border-white/20">
                {!candlesBlown && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-12 bg-orange-500 rounded-full animate-flame blur-[1px]">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full scale-75 animate-pulse"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-white/40 rounded-full scale-50"></div>
                  </div>
                )}
                {candlesBlown && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-1 h-3 bg-slate-800 rounded-full"></div>
                    <div className="w-4 h-8 bg-slate-400/30 rounded-full animate-smoke blur-md"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Cake Stand */}
        <div className="w-80 h-6 bg-slate-100 rounded-full -mb-2 shadow-xl border-b-4 border-slate-300"></div>
        <div className="w-48 h-12 bg-slate-100 rounded-b-full mx-auto shadow-inner"></div>
      </div>

      <div className="max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-2xl">
        <h2 className="text-5xl font-cursive text-pink-400 mb-6 drop-shadow-lg">
          {candlesBlown ? "WISH GRANTED! 🎊" : "Blow into the Mic!"}
        </h2>
        
        {!micActive && !candlesBlown && (
          <button
            onClick={startListening}
            className="px-10 py-5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] animate-pulse"
          >
            I'M READY TO BLOW! 🌬️
          </button>
        )}
        
        {micActive && !candlesBlown && (
          <div className="space-y-6">
            <p className="text-2xl font-black text-white tracking-widest animate-bounce">BLOW SOFTLY NOW! 🌬️</p>
            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-white/10 p-1">
              <div 
                className={`h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-100 rounded-full ${intensity > 30 ? 'animate-pulse' : ''}`}
                style={{ width: `${Math.min(intensity * 2.5, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-widest">Wind Power Detected</p>
          </div>
        )}

        {candlesBlown && (
          <div className="animate-fadeInScale flex flex-col items-center">
            <p className="text-3xl font-black text-yellow-400 mb-4 drop-shadow-lg">HAPPY BIRTHDAY SAI! 🎂✨</p>
            <div className="flex space-x-2 text-4xl mb-6">
              <span>🎉</span><span>🥳</span><span>🥂</span><span>🔥</span>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-slate-800 text-white rounded-full text-xs font-bold border border-white/10 hover:bg-slate-700 transition"
            >
              Celebrate Again?
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes flame {
          0%, 100% { transform: translateX(-50%) scale(1) skew(2deg); border-radius: 50% 50% 20% 20%; box-shadow: 0 0 20px #ff6b00; }
          33% { transform: translateX(-52%) scale(1.1) skew(-2deg); box-shadow: 0 0 30px #ff9e00; }
          66% { transform: translateX(-48%) scale(0.9) skew(1deg); box-shadow: 0 0 25px #ff6b00; }
        }
        .animate-flame { animation: flame 0.4s ease-in-out infinite; }
        
        @keyframes smoke {
          0% { transform: translateY(0) scale(1) rotate(0); opacity: 0.8; }
          100% { transform: translateY(-100px) scale(4) rotate(45deg); opacity: 0; }
        }
        .animate-smoke { animation: smoke 3s ease-out forwards; }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInScale { animation: fadeInScale 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};
