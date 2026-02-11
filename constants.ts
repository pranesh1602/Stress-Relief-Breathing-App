
import { BreathingPattern } from './types';

export const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'The Navy SEAL technique for instant focus and calm.',
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4,
    color: 'emerald'
  },
  {
    id: '478',
    name: '4-7-8 Sleep',
    description: 'A natural tranquilizer for the nervous system.',
    inhale: 4,
    holdIn: 7,
    exhale: 8,
    holdOut: 0,
    color: 'indigo'
  },
  {
    id: 'calm',
    name: 'Deep Calm',
    description: 'Extended exhales to activate the parasympathetic system.',
    inhale: 4,
    holdIn: 0,
    exhale: 6,
    holdOut: 0,
    color: 'sky'
  },
  {
    id: 'energy',
    name: 'Energize',
    description: 'Short, powerful breaths to boost alertness.',
    inhale: 2,
    holdIn: 1,
    exhale: 2,
    holdOut: 0,
    color: 'amber'
  }
];

export const MOOD_LABELS = [
  { score: 1, label: 'Very Stressed', icon: '😫' },
  { score: 2, label: 'Anxious', icon: '😟' },
  { score: 3, label: 'Neutral', icon: '😐' },
  { score: 4, label: 'Relaxed', icon: '😌' },
  { score: 5, label: 'Peaceful', icon: '✨' },
];
