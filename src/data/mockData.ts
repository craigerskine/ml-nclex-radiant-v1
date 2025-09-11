import { Question, User, Progress, Achievement, NCLEX_DOMAINS } from '../types';

export const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'A nurse is caring for a client who has pneumonia. Which of the following interventions should the nurse implement to promote airway clearance?',
    options: [
      'Encourage the client to lie flat in bed',
      'Provide chest physiotherapy every 2 hours',
      'Restrict fluid intake to prevent congestion',
      'Administer a cough suppressant as needed'
    ],
    correctAnswer: 1,
    rationale: {
      explanation: 'Chest physiotherapy helps mobilize secretions in clients with pneumonia by using percussion, vibration, and postural drainage techniques.',
      keyPoints: [
        'Chest physiotherapy mechanically loosens secretions',
        'Regular positioning changes promote drainage',
        'Adequate hydration thins secretions'
      ],
      commonMisconceptions: [
        'Lying flat can worsen pneumonia by promoting secretion pooling',
        'Fluid restriction actually thickens secretions',
        'Cough suppressants prevent beneficial expectoration'
      ]
    },
    domain: 'Physiological Integrity',
    difficulty: 'medium',
    tags: ['respiratory', 'pneumonia', 'airway-clearance'],
    timeEstimate: 60
  },
  {
    id: '2',
    question: 'A client with diabetes mellitus type 1 is admitted with diabetic ketoacidosis (DKA). Which laboratory value would the nurse expect to find?',
    options: [
      'Blood glucose 250 mg/dL, pH 7.35',
      'Blood glucose 450 mg/dL, pH 7.25',
      'Blood glucose 180 mg/dL, pH 7.40',
      'Blood glucose 320 mg/dL, pH 7.45'
    ],
    correctAnswer: 1,
    rationale: {
      explanation: 'DKA is characterized by hyperglycemia (>250 mg/dL) and acidosis (pH <7.30) due to ketone production from fat breakdown.',
      keyPoints: [
        'DKA involves severe hyperglycemia',
        'Acidosis results from ketone accumulation',
        'pH below 7.30 indicates acidosis'
      ],
      commonMisconceptions: [
        'Normal glucose levels rule out DKA',
        'Alkalosis can occur in DKA',
        'Mild hyperglycemia is sufficient for DKA diagnosis'
      ]
    },
    domain: 'Physiological Integrity',
    difficulty: 'hard',
    tags: ['diabetes', 'DKA', 'acid-base', 'emergency'],
    timeEstimate: 90
  },
  {
    id: '3',
    question: 'Which action demonstrates proper hand hygiene technique according to WHO guidelines?',
    options: [
      'Rub hands for 10 seconds with alcohol-based sanitizer',
      'Wash hands for 20 seconds with soap and warm water',
      'Use hand sanitizer only when hands appear soiled',
      'Rinse hands briefly under cool water'
    ],
    correctAnswer: 1,
    rationale: {
      explanation: 'Proper handwashing requires 20 seconds with soap and warm water to effectively remove microorganisms and prevent healthcare-associated infections.',
      keyPoints: [
        '20 seconds is the minimum effective duration',
        'Soap mechanically removes pathogens',
        'Warm water enhances soap effectiveness'
      ],
      commonMisconceptions: [
        '10 seconds is insufficient for pathogen removal',
        'Hand sanitizer alone cannot remove all contaminants',
        'Cool water reduces soap effectiveness'
      ]
    },
    domain: 'Safe and Effective Care Environment',
    difficulty: 'easy',
    tags: ['infection-control', 'hand-hygiene', 'safety'],
    timeEstimate: 45
  }
];

export const mockUser: User = {
  id: 'user_1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  examType: 'NCLEX-RN',
  examDate: '2025-04-15',
  onboardingCompleted: true,
  confidenceRatings: {
    'Safe and Effective Care Environment': 7,
    'Health Promotion and Maintenance': 6,
    'Psychosocial Integrity': 8,
    'Physiological Integrity': 5
  },
  studyPreferences: {
    preferredStudyTime: '19:00',
    sessionsPerWeek: 6,
    sessionDuration: 30
  },
  createdAt: '2025-01-01T00:00:00Z'
};

export const mockProgress: Progress = {
  userId: 'user_1',
  domainScores: {
    'Safe and Effective Care Environment': 78,
    'Health Promotion and Maintenance': 85,
    'Psychosocial Integrity': 72,
    'Physiological Integrity': 68
  },
  confidenceScores: {
    'Safe and Effective Care Environment': 8,
    'Health Promotion and Maintenance': 7,
    'Psychosocial Integrity': 9,
    'Physiological Integrity': 6
  },
  totalQuestions: 247,
  correctAnswers: 189,
  currentStreak: 5,
  longestStreak: 12,
  readinessScore: 76,
  lastUpdated: new Date().toISOString()
};

export const mockAchievements: Achievement[] = [
  {
    id: 'streak_5',
    title: 'Five Day Warrior',
    description: 'Maintained a 5-day study streak',
    icon: '🔥',
    earned: true,
    earnedAt: '2025-01-10T00:00:00Z'
  },
  {
    id: 'first_100',
    title: 'Century Mark',
    description: 'Completed 100 practice questions',
    icon: '💯',
    earned: true,
    earnedAt: '2025-01-08T00:00:00Z'
  },
  {
    id: 'domain_master',
    title: 'Domain Expert',
    description: 'Achieved 80%+ in a domain',
    icon: '🎯',
    earned: true,
    earnedAt: '2025-01-12T00:00:00Z'
  },
  {
    id: 'streak_10',
    title: 'Perfect Ten',
    description: 'Maintained a 10-day study streak',
    icon: '⚡',
    earned: false
  }
];