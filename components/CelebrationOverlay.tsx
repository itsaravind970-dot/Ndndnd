
import React, { useEffect, useState } from 'react';
import { Particle } from '../types';

interface Props {
  isExtra?: boolean;
}

export const CelebrationOverlay: React.FC<Props> = ({ isExtra }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const count = isExtra ? 120 : 50;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: isExtra 
        ? ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)]
        : ['#EC4899', '#8B5CF6', '#F59E0B', '#10B981', '#3B82F6'][Math.floor(Math.random() * 5)],
      size: Math.random() * (isExtra ? 15 : 8) + 4,
      duration: Math.random() * (isExtra ? 3 : 10) + 5,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, [isExtra]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-1000 ${isExtra ? 'opacity-100' : 'opacity-60'}`}>
      {particles.map(p => (
        <div
          key={p.id}
          className={`absolute rounded-full ${isExtra ? 'opacity-80' : 'opacity-20'} shadow-lg`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animation: `float ${p.duration}s linear infinite`,
            animationDelay: `-${p.delay}s`,
            boxShadow: isExtra ? `0 0 10px ${p.color}` : 'none'
          }}
        />
      ))}
      <div className="absolute top-10 left-10 text-6xl opacity-40 animate-bounce">🎈</div>
      <div className="absolute top-20 right-20 text-6xl opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}>🎉</div>
      <div className="absolute bottom-40 left-1/4 text-6xl opacity-40 animate-float">✨</div>
      <div className="absolute bottom-20 right-1/4 text-6xl opacity-40 animate-float" style={{ animationDelay: '1s' }}>🍰</div>
      
      {isExtra && (
        <>
          <div className="absolute top-1/2 left-10 text-8xl animate-spin-slow opacity-60">🍭</div>
          <div className="absolute bottom-1/4 right-10 text-8xl animate-bounce-sideways opacity-60">🦄</div>
        </>
      )}

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-50px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        
        .animate-bounce-sideways { animation: bounce-side 3s ease-in-out infinite; }
        @keyframes bounce-side {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(100px); }
        }
      `}</style>
    </div>
  );
};
