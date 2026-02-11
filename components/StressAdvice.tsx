
import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { getStressReliefAdvice } from '../services/geminiService';
import { AIAdvice, UserMood } from '../types';

interface Props {
  mood: UserMood;
}

const StressAdvice: React.FC<Props> = ({ mood }) => {
  const [advice, setAdvice] = useState<AIAdvice | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAdvice() {
      setLoading(true);
      const data = await getStressReliefAdvice(mood.label);
      setAdvice(data);
      setLoading(false);
    }
    fetchAdvice();
  }, [mood]);

  if (loading) {
    return (
      <div className="glass-panel rounded-3xl p-8 flex flex-col items-center justify-center animate-pulse">
        <Loader2 className="animate-spin text-slate-400 mb-2" size={24} />
        <p className="text-slate-500 text-sm">Brewing some peace of mind...</p>
      </div>
    );
  }

  if (!advice) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} className="text-indigo-200" />
          <h3 className="text-sm font-semibold uppercase tracking-widest text-indigo-100">Personalized for you</h3>
        </div>
        
        <p className="text-xl md:text-2xl font-medium leading-tight mb-6 italic">
          "{advice.affirmation}"
        </p>
        
        <div className="space-y-3">
          {advice.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-400/30 flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </span>
              <p className="text-sm text-indigo-50 leading-snug">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StressAdvice;
