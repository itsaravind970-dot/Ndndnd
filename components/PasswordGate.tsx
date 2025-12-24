
import React, { useState } from 'react';

interface Props {
  onCorrectPassword: () => void;
}

export const PasswordGate: React.FC<Props> = ({ onCorrectPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'sai model') {
      onCorrectPassword();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-pink-500 rounded-full mx-auto flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2">Identify Yourself</h2>
          <p className="text-slate-400">Only the chosen one may enter this celebration.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password..."
              className={`w-full bg-slate-800 border-2 rounded-xl px-4 py-4 text-center text-xl transition-all outline-none ${
                error ? 'border-red-500 animate-shake' : 'border-slate-700 focus:border-pink-500'
              }`}
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-bold text-lg hover:from-pink-500 hover:to-purple-500 shadow-lg transform transition active:scale-95"
          >
            Access Celebration
          </button>
        </form>
        
        <p className="mt-6 text-center text-xs text-slate-500 uppercase tracking-widest">
          Hint: s _ _ m _ _ _ l
        </p>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
