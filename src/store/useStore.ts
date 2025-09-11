import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, StudySession, StudyPlan, Progress, Achievement, Question } from '../types';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Study state
  currentSession: StudySession | null;
  studyPlan: StudyPlan | null;
  progress: Progress | null;
  achievements: Achievement[];
  
  // UI state
  currentPage: string;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setCurrentSession: (session: StudySession | null) => void;
  setStudyPlan: (plan: StudyPlan) => void;
  setProgress: (progress: Progress) => void;
  updateProgress: (updates: Partial<Progress>) => void;
  addAchievement: (achievement: Achievement) => void;
  setCurrentPage: (page: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      currentSession: null,
      studyPlan: null,
      progress: null,
      achievements: [],
      currentPage: 'dashboard',
      isLoading: false,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: true }),
      
      setCurrentSession: (session) => set({ currentSession: session }),
      
      setStudyPlan: (plan) => set({ studyPlan: plan }),
      
      setProgress: (progress) => set({ progress }),
      
      updateProgress: (updates) => set((state) => ({
        progress: state.progress ? { ...state.progress, ...updates } : null
      })),
      
      addAchievement: (achievement) => set((state) => ({
        achievements: [...state.achievements, achievement]
      })),
      
      setCurrentPage: (page) => set({ currentPage: page }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      logout: () => set({
        user: null,
        isAuthenticated: false,
        currentSession: null,
        studyPlan: null,
        progress: null,
        achievements: [],
        currentPage: 'dashboard'
      }),
    }),
    {
      name: 'nclex-radiant-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        studyPlan: state.studyPlan,
        progress: state.progress,
        achievements: state.achievements
      }),
    }
  )
);