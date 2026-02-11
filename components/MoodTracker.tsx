
import React from 'react';
import { MOOD_LABELS } from '../constants';
import { UserMood } from '../types';

interface Props {
  onMoodSelected: (mood: UserMood) => void;
  currentMood: UserMood | null;
}

const MoodTracker: React.FC<Props> = ({ onMoodSelected, currentMood }) => {
  return (
    <div className="glass-panel rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">How are you feeling right now?</h3>
      <div className="flex justify-between items-center gap-2">
        {MOOD_LABELS.map((mood) => (
          <button
            key={mood.score}
            onClick={() => onMoodSelected({ score: mood.score, label: mood.label, timestamp: Date.now() })}
            className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
              currentMood?.score === mood.score 
                ? 'bg-slate-800 text-white scale-105 shadow-md' 
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <span className="text-2xl mb-1">{mood.icon}</span>
            <span className="text-[10px] font-medium uppercase tracking-tighter opacity-70">
              {mood.label.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
