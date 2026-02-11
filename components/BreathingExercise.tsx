
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BreathingPattern, BreathingPhase } from '../types';
import { ChevronLeft, Play, Pause, RefreshCcw } from 'lucide-react';

interface Props {
  pattern: BreathingPattern;
  onBack: () => void;
}

const BreathingExercise: React.FC<Props> = ({ pattern, onBack }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>(BreathingPhase.REST);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  
  // Use number instead of NodeJS.Timeout for browser environment compatibility
  const timerRef = useRef<number | null>(null);

  const startNextPhase = useCallback((currentPhase: BreathingPhase) => {
    let next: BreathingPhase;
    let duration: number;

    switch (currentPhase) {
      case BreathingPhase.REST:
      case BreathingPhase.HOLD:
        if (currentPhase === BreathingPhase.HOLD && pattern.holdOut > 0) {
          next = BreathingPhase.REST; // Using REST as holdOut phase
          duration = pattern.holdOut;
        } else {
          next = BreathingPhase.INHALE;
          duration = pattern.inhale;
        }
        break;
      case BreathingPhase.INHALE:
        if (pattern.holdIn > 0) {
          next = BreathingPhase.HOLD;
          duration = pattern.holdIn;
        } else {
          next = BreathingPhase.EXHALE;
          duration = pattern.exhale;
        }
        break;
      case BreathingPhase.HOLD:
        next = BreathingPhase.EXHALE;
        duration = pattern.exhale;
        break;
      case BreathingPhase.EXHALE:
        if (pattern.holdOut > 0) {
          next = BreathingPhase.REST;
          duration = pattern.holdOut;
        } else {
          next = BreathingPhase.INHALE;
          duration = pattern.inhale;
          setCompletedCycles(prev => prev + 1);
        }
        break;
      default:
        next = BreathingPhase.INHALE;
        duration = pattern.inhale;
    }

    // Special case for ending a cycle when no holdOut exists
    if (currentPhase === BreathingPhase.EXHALE && pattern.holdOut === 0) {
        setCompletedCycles(prev => prev + 1);
    }
    // Special case for ending a cycle when holdOut exists
    if (currentPhase === BreathingPhase.REST && pattern.holdOut > 0) {
        setCompletedCycles(prev => prev + 1);
        next = BreathingPhase.INHALE;
        duration = pattern.inhale;
    }

    setPhase(next);
    setSecondsRemaining(duration);
    setTotalSeconds(duration);
  }, [pattern]);

  useEffect(() => {
    if (isActive) {
      if (secondsRemaining > 0) {
        // Use window.setTimeout to ensure browser type matching
        timerRef.current = window.setTimeout(() => {
          setSecondsRemaining(prev => prev - 1);
        }, 1000);
      } else {
        startNextPhase(phase);
      }
    } else {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [isActive, secondsRemaining, phase, startNextPhase]);

  const toggleExercise = () => {
    if (!isActive && phase === BreathingPhase.REST && secondsRemaining === 0) {
      startNextPhase(BreathingPhase.REST);
    }
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase(BreathingPhase.REST);
    setSecondsRemaining(0);
    setCompletedCycles(0);
  };

  const getProgress = () => {
    if (totalSeconds === 0) return 0;
    return ((totalSeconds - secondsRemaining) / totalSeconds) * 100;
  };

  const getColorClass = () => {
    switch(pattern.color) {
      case 'emerald': return 'from-emerald-400 to-teal-500';
      case 'indigo': return 'from-indigo-400 to-purple-500';
      case 'sky': return 'from-sky-400 to-blue-500';
      case 'amber': return 'from-amber-400 to-orange-500';
      default: return 'from-emerald-400 to-teal-500';
    }
  };

  const getBgColorClass = () => {
    switch(pattern.color) {
      case 'emerald': return 'bg-emerald-50';
      case 'indigo': return 'bg-indigo-50';
      case 'sky': return 'bg-sky-50';
      case 'amber': return 'bg-amber-50';
      default: return 'bg-emerald-50';
    }
  };

  const getScale = () => {
    if (!isActive) return 'scale-100';
    if (phase === BreathingPhase.INHALE) {
      const p = (totalSeconds - secondsRemaining) / totalSeconds;
      return `scale-[${1 + p * 0.5}]`;
    }
    if (phase === BreathingPhase.EXHALE) {
      const p = secondsRemaining / totalSeconds;
      return `scale-[${1 + p * 0.5}]`;
    }
    if (phase === BreathingPhase.HOLD) return 'scale-[1.5]';
    return 'scale-100';
  };

  // Manual scale calculation for style attribute since Tailwind doesn't support dynamic arbitrary scale well
  const dynamicScale = () => {
    if (!isActive) return 1;
    if (phase === BreathingPhase.INHALE) return 1 + ((totalSeconds - secondsRemaining) / totalSeconds) * 0.5;
    if (phase === BreathingPhase.EXHALE) return 1 + (secondsRemaining / totalSeconds) * 0.5;
    if (phase === BreathingPhase.HOLD) return 1.5;
    return 1;
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 transition-colors duration-1000 ${getBgColorClass()}`}>
      <div className="w-full flex justify-between items-center max-w-lg">
        <button onClick={onBack} className="p-2 hover:bg-white/50 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        <h2 className="text-xl font-semibold text-slate-800">{pattern.name}</h2>
        <button onClick={resetExercise} className="p-2 hover:bg-white/50 rounded-full transition-colors">
          <RefreshCcw size={20} className="text-slate-600" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg relative">
        {/* Animated Circle */}
        <div 
          className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center transition-transform duration-1000 ease-in-out`}
          style={{ transform: `scale(${dynamicScale()})` }}
        >
          {/* Main Circle */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getColorClass()} shadow-2xl opacity-80 blur-[2px]`}></div>
          
          {/* Inner Content */}
          <div className="relative z-10 text-white flex flex-col items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold tracking-wider uppercase mb-1 drop-shadow-md">
              {phase === BreathingPhase.REST && !isActive ? 'Ready' : phase}
            </span>
            <span className="text-4xl md:text-5xl font-light font-inter drop-shadow-md">
              {isActive ? (secondsRemaining || pattern.inhale) : pattern.inhale}
            </span>
          </div>

          {/* Pulsing Outer Rings */}
          <div className={`absolute inset-0 rounded-full border-4 border-white/20 animate-ping opacity-20 ${!isActive && 'hidden'}`}></div>
          <div className={`absolute -inset-8 rounded-full border border-white/10 ${!isActive && 'hidden'}`}></div>
        </div>

        {/* Instructions */}
        <div className="mt-20 text-center px-4">
          <p className="text-slate-500 text-lg max-w-xs mx-auto animate-pulse">
            {isActive ? 
              (phase === BreathingPhase.INHALE ? "Breathe in through your nose" : 
               phase === BreathingPhase.HOLD ? "Hold gently" : 
               phase === BreathingPhase.EXHALE ? "Slowly breathe out" : 
               "Wait for the next cycle") : 
              "Find a comfortable position and tap start."
            }
          </p>
          <div className="mt-8 flex justify-center gap-2">
             {[...Array(4)].map((_, i) => (
                <div key={i} className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${i < completedCycles % 4 ? 'bg-slate-400' : 'bg-slate-200'}`}></div>
             ))}
          </div>
          <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-medium">Cycles: {completedCycles}</p>
        </div>
      </div>

      <div className="w-full max-w-lg flex flex-col items-center gap-6 pb-8">
        <button 
          onClick={toggleExercise}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-lg ${isActive ? 'bg-white text-slate-800' : 'bg-slate-800 text-white'}`}
        >
          {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
        </button>
        <p className="text-slate-400 text-sm font-medium tracking-wide">
          {isActive ? 'Pause anytime' : 'Start session'}
        </p>
      </div>
    </div>
  );
};

export default BreathingExercise;
