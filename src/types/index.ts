export interface User {
  id: string;
  name: string;
  email: string;
  examType: 'NCLEX-RN' | 'NCLEX-PN';
  examDate: string;
  onboardingCompleted: boolean;
  confidenceRatings: Record<string, number>;
  studyPreferences: {
    preferredStudyTime: string;
    sessionsPerWeek: number;
    sessionDuration: number;
  };
  createdAt: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  rationale: {
    explanation: string;
    keyPoints: string[];
    commonMisconceptions: string[];
  };
  domain: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  timeEstimate: number;
}

export interface StudySession {
  id: string;
  userId: string;
  questions: Question[];
  answers: Record<string, number>;
  confidence: Record<string, number>;
  startTime: string;
  endTime?: string;
  score: number;
  completed: boolean;
}

export interface StudyPlan {
  id: string;
  userId: string;
  examDate: string;
  weeklyGoals: {
    week: number;
    questionsTarget: number;
    domainsToFocus: string[];
    completed: boolean;
  }[];
  currentWeek: number;
  overallProgress: number;
  nextSession: string;
}

export interface Progress {
  userId: string;
  domainScores: Record<string, number>;
  confidenceScores: Record<string, number>;
  totalQuestions: number;
  correctAnswers: number;
  currentStreak: number;
  longestStreak: number;
  readinessScore: number;
  lastUpdated: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export const NCLEX_DOMAINS = [
  'Safe and Effective Care Environment',
  'Health Promotion and Maintenance',
  'Psychosocial Integrity',
  'Physiological Integrity'
] as const;

export type NCLEXDomain = typeof NCLEX_DOMAINS[number];