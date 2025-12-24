
import React from 'react';

export const GiftCard: React.FC = () => {
  return (
    <div className="perspective-1000 animate-fadeIn">
      <div className="relative w-[300px] h-[400px] sm:w-[350px] sm:h-[450px] bg-white rounded-2xl shadow-2xl p-8 text-slate-900 transform rotate-2 animate-wiggle">
        <div className="absolute inset-0 border-4 border-pink-200 rounded-2xl pointer-events-none m-2"></div>
        
        <div className="h-full flex flex-col justify-between items-center text-center">
          <div className="space-y-4">
            <span className="text-4xl">💖</span>
            <h3 className="font-cursive text-4xl text-pink-600">Special Delivery</h3>
          </div>
          
          <div className="py-8">
            <p className="text-2xl font-bold text-slate-800 leading-relaxed italic">
              "happy Birthday ra pukaaaaaaaaaa ❤️❤️😘"
            </p>
          </div>
          
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
          
          <div className="text-sm text-pink-500 font-bold tracking-widest uppercase">
            From the Bestie
          </div>
        </div>
      </div>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(2deg); }
          50% { transform: rotate(-2deg); }
        }
        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
