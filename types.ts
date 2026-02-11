
export enum BreathingPhase {
  INHALE = 'Inhale',
  HOLD = 'Hold',
  EXHALE = 'Exhale',
  REST = 'Rest'
}

export interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  inhale: number;
  holdIn: number;
  exhale: number;
  holdOut: number;
  color: string;
}

export interface UserMood {
  score: number;
  timestamp: number;
  label: string;
}

export interface AIAdvice {
  tips: string[];
  affirmation: string;
}
