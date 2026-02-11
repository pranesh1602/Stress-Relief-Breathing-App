
import React, { useState } from 'react';
import { BreathingPattern, UserMood } from './types';
import { BREATHING_PATTERNS } from './constants';
import BreathingExercise from './components/BreathingExercise';
import MoodTracker from './components/MoodTracker';
import StressAdvice from './components/StressAdvice';
import { Wind, Info, BookOpen, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern | null>(null);
  const [currentMood, setCurrentMood] = useState<UserMood | null>(null);

  const handlePatternSelect = (pattern: BreathingPattern) => {
    setSelectedPattern(pattern);
  };

  return (
    <div className="min-h-screen gradient-bg pb-24">
      {/* Exercise Overlay */}
      {selectedPattern && (
        <BreathingExercise 
          pattern={selectedPattern} 
          onBack={() => setSelectedPattern(null)} 
        />
      )}

      {/* Header */}
      <header className="px-6 pt-12 pb-8 max-w-2xl mx-auto flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Serenity</h1>
          <p className="text-slate-500 font-medium">Breathe away the stress</p>
        </div>
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <Wind className="text-emerald-500" size={24} />
        </div>
      </header>

      <main className="px-6 space-y-8 max-w-2xl mx-auto">
        {/* Mood Section */}
        <section>
          <MoodTracker 
            onMoodSelected={setCurrentMood} 
            currentMood={currentMood} 
          />
        </section>

        {/* AI Advice Section */}
        {currentMood && (
          <section className="transition-all duration-1000 animate-in fade-in slide-in-from-bottom-4">
            <StressAdvice mood={currentMood} />
          </section>
        )}

        {/* Patterns Selection */}
        <section>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-xl font-bold text-slate-800">Breath Library</h2>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Info size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BREATHING_PATTERNS.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => handlePatternSelect(pattern)}
                className="group relative glass-panel text-left p-6 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
                   <Wind size={80} />
                </div>
                <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center bg-${pattern.color}-100 text-${pattern.color}-600`}>
                  <Wind size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{pattern.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{pattern.description}</p>
                <div className="mt-4 flex gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>{pattern.inhale} In</span>
                  {pattern.holdIn > 0 && <span>• {pattern.holdIn} Hold</span>}
                  <span>• {pattern.exhale} Out</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Daily Tip / Quote */}
        <section className="bg-white/40 p-6 rounded-3xl border border-white/60">
           <div className="flex items-center gap-3 mb-2">
              <BookOpen size={18} className="text-slate-400" />
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Daily Insight</h4>
           </div>
           <p className="text-slate-600 text-sm italic">
             "Breath is the bridge which connects life to consciousness, which unites your body to your thoughts."
           </p>
           <p className="text-slate-400 text-xs mt-2">— Thich Nhat Hanh</p>
        </section>
      </main>

      {/* Sticky Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md glass-panel rounded-3xl shadow-2xl p-2 flex justify-between items-center border border-white/50">
         <button className="flex-1 flex flex-col items-center p-2 text-emerald-600">
            <Wind size={20} />
            <span className="text-[10px] font-bold uppercase mt-1">Breath</span>
         </button>
         <button className="flex-1 flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <BookOpen size={20} />
            <span className="text-[10px] font-bold uppercase mt-1">Learn</span>
         </button>
         <button className="flex-1 flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Settings size={20} />
            <span className="text-[10px] font-bold uppercase mt-1">Settings</span>
         </button>
      </nav>
    </div>
  );
};

export default App;
