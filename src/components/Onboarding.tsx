import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { NCLEX_DOMAINS } from '../types';
import { mockUser, mockProgress, mockAchievements } from '../data/mockData';
import {
  BookOpen,
  Calendar,
  Target,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { setUser, setProgress, achievements } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    examType: 'NCLEX-RN' as 'NCLEX-RN' | 'NCLEX-PN',
    examDate: '',
    confidenceRatings: {} as Record<string, number>,
    preferredStudyTime: '19:00',
    sessionsPerWeek: 6,
    sessionDuration: 30,
  });

  const steps = [
    {
      title: 'Welcome',
      description: "Let's get started with your NCLEX journey",
    },
    {
      title: 'Basic Info',
      description: 'Tell us about yourself and your exam',
    },
    {
      title: 'Confidence Assessment',
      description: 'Rate your current confidence in each domain',
    },
    {
      title: 'Study Preferences',
      description: 'Set up your personalized study schedule',
    },
    {
      title: 'Plan Creation',
      description: 'Generating your adaptive study plan',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      const user = {
        ...mockUser,
        ...formData,
        id: 'user_' + Date.now(),
        onboardingCompleted: true,
        createdAt: new Date().toISOString(),
      };

      setUser(user);
      setProgress({
        ...mockProgress,
        userId: user.id,
        confidenceScores: formData.confidenceRatings,
      });

      // Add initial achievements
      mockAchievements.forEach((achievement) => {
        useStore.getState().addAchievement(achievement);
      });

      useStore.getState().setCurrentPage('dashboard');
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return formData.name && formData.email && formData.examDate;
      case 2:
        return (
          Object.keys(formData.confidenceRatings).length ===
          NCLEX_DOMAINS.length
        );
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-slate-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-slate-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 0 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-4">
                Welcome to NCLEX Radiant! 🌟
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Your adaptive learning companion for NCLEX success. We'll create
                a personalized study plan that adapts to your progress and keeps
                you motivated.
              </p>
              <div className="border bg-slate-50 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 rounded-xl divide-y divide-x-0 md:divide-y-0 md:divide-x shadow-lg">
                <div className="p-4">
                  <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-medium text-slate-800">
                    Adaptive Learning
                  </h3>
                  <p className="text-sm text-slate-600">
                    Personalized to your strengths and weaknesses
                  </p>
                </div>
                <div className="p-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-medium text-slate-800">
                    Progress Tracking
                  </h3>
                  <p className="text-sm text-slate-600">
                    Real-time insights into your readiness
                  </p>
                </div>
                <div className="p-4">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-medium text-slate-800">
                    Flexible Schedule
                  </h3>
                  <p className="text-sm text-slate-600">
                    Study at your own pace and convenience
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-slate-600 mb-8">
                {steps[currentStep].description}
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Exam Type
                    </label>
                    <select
                      value={formData.examType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          examType: e.target.value as 'NCLEX-RN' | 'NCLEX-PN',
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="NCLEX-RN">NCLEX-RN</option>
                      <option value="NCLEX-PN">NCLEX-PN</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Exam Date
                    </label>
                    <input
                      type="date"
                      value={formData.examDate}
                      onChange={(e) =>
                        setFormData({ ...formData, examDate: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-slate-600 mb-8">
                Rate your current confidence level in each NCLEX domain (1 = Not
                confident, 10 = Very confident)
              </p>

              <div className="space-y-6">
                {NCLEX_DOMAINS.map((domain) => (
                  <div key={domain}>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      {domain}
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                        <button
                          key={rating}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              confidenceRatings: {
                                ...formData.confidenceRatings,
                                [domain]: rating,
                              },
                            })
                          }
                          className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-all ${
                            formData.confidenceRatings[domain] === rating
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : 'border-slate-300 text-slate-600 hover:border-slate-400'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-slate-600 mb-8">
                Let's customize your study schedule to fit your lifestyle
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preferred Study Time
                  </label>
                  <input
                    type="time"
                    value={formData.preferredStudyTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredStudyTime: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Sessions Per Week
                    </label>
                    <select
                      value={formData.sessionsPerWeek}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sessionsPerWeek: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={3}>3 sessions</option>
                      <option value={4}>4 sessions</option>
                      <option value={5}>5 sessions</option>
                      <option value={6}>6 sessions</option>
                      <option value={7}>7 sessions (daily)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Session Duration
                    </label>
                    <select
                      value={formData.sessionDuration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sessionDuration: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>60 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Your Plan is Ready! 🎉
              </h2>
              <p className="text-slate-600 mb-8">
                We've analyzed your responses and created a personalized study
                plan that adapts to your learning style and schedule.
              </p>
              <div className="bg-slate-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-slate-800 mb-4">
                  Your Personalized Plan Includes:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>
                      Daily {formData.sessionDuration}-minute sessions
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Focus on weaker domains first</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Progress tracking & analytics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Motivation & achievement system</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>

            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= currentStep ? 'bg-blue-500' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span>
                {currentStep === steps.length - 1 ? 'Start Learning' : 'Next'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
