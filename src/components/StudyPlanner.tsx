import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import {
  Calendar,
  Target,
  BookOpen,
  Clock,
  TrendingUp,
  Settings,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit,
} from 'lucide-react';
import { format, addWeeks, differenceInDays, addDays } from 'date-fns';

export const StudyPlanner: React.FC = () => {
  const { user, progress } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  if (!user || !progress) return null;

  const examDate = new Date(user.examDate);
  const today = new Date();
  const daysUntilExam = differenceInDays(examDate, today);
  const weeksUntilExam = Math.ceil(daysUntilExam / 7);

  // Generate adaptive study plan
  const generateStudyPlan = () => {
    const weakestDomains = Object.entries(progress.domainScores)
      .sort(([, a], [, b]) => a - b)
      .slice(0, 2)
      .map(([domain]) => domain);

    const weeks = [];
    for (let i = 0; i < Math.min(weeksUntilExam, 8); i++) {
      const weekStart = addWeeks(today, i);
      const questionsTarget = Math.max(50, 100 - progress.readinessScore / 2); // Adaptive based on readiness

      weeks.push({
        week: i + 1,
        startDate: format(weekStart, 'MMM dd'),
        endDate: format(addDays(weekStart, 6), 'MMM dd'),
        questionsTarget,
        focusDomains:
          i < 4 ? weakestDomains : Object.keys(progress.domainScores),
        completed: i === 0 ? 75 : i === 1 ? 45 : 0, // Mock completion
        priority: i < 2 ? 'high' : i < 4 ? 'medium' : 'low',
      });
    }
    return weeks;
  };

  const studyPlan = generateStudyPlan();
  const currentWeek = studyPlan[0];

  const upcomingSessions = [
    {
      date: 'Today',
      time: '7:00 PM',
      type: 'Practice Questions',
      duration: '30 min',
      domain: 'Physiological Integrity',
    },
    {
      date: 'Tomorrow',
      time: '7:00 PM',
      type: 'Weak Areas Review',
      duration: '45 min',
      domain: 'Safe Care Environment',
    },
    {
      date: 'Wed',
      time: '7:00 PM',
      type: 'Practice Questions',
      duration: '30 min',
      domain: 'Health Promotion',
    },
    {
      date: 'Thu',
      time: '7:00 PM',
      type: 'Mixed Practice',
      duration: '60 min',
      domain: 'All Domains',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Study Planner</h1>
          <p className="text-slate-600">
            Personalized plan for your {user.examType} success
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-sm text-slate-500">Days Until Exam</p>
            <p className="text-2xl font-bold text-blue-500">{daysUntilExam}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Customize Plan</span>
          </button>
        </div>
      </div>

      {/* Plan Overview */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">Current Week</p>
            <p className="text-2xl font-bold">Week {currentWeek.week}</p>
            <p className="text-blue-100 text-sm">
              {currentWeek.startDate} - {currentWeek.endDate}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Progress</p>
            <p className="text-2xl font-bold">{currentWeek.completed}%</p>
            <div className="w-full bg-blue-500 rounded-full h-2 mt-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${currentWeek.completed}%` }}
              />
            </div>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Questions Target</p>
            <p className="text-2xl font-bold">{currentWeek.questionsTarget}</p>
            <p className="text-blue-100 text-sm">This week</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Focus Areas</p>
            <div className="space-y-1">
              {currentWeek.focusDomains.map((domain, index) => (
                <p
                  key={index}
                  className="text-sm bg-blue-500 bg-opacity-50 px-2 py-1 rounded"
                >
                  {domain.split(' ').slice(0, 2).join(' ')}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            8-Week Study Plan
          </h2>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Target className="w-4 h-4" />
            <span>Adaptive based on your performance</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {studyPlan.map((week) => (
            <div
              key={week.week}
              className={`p-4 rounded-lg border-2 transition-all ${
                week.week === 1
                  ? 'border-blue-500 bg-blue-50'
                  : week.completed > 0
                  ? 'border-green-500 bg-green-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      week.week === 1
                        ? 'bg-blue-500 text-white'
                        : week.completed > 0
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {week.completed > 0 ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      week.week
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">
                      Week {week.week}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {week.startDate} - {week.endDate}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    week.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : week.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {week.priority} priority
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">
                    Questions Target
                  </span>
                  <span className="font-medium text-slate-800">
                    {week.questionsTarget}
                  </span>
                </div>

                {week.completed > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-medium">{week.completed}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${week.completed}%` }}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm text-slate-600 mb-2">Focus Domains</p>
                  <div className="flex flex-wrap gap-1">
                    {week.focusDomains.map((domain, index) => (
                      <span
                        key={index}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                      >
                        {domain.split(' ').slice(0, 3).join(' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Upcoming Sessions
          </h2>
          <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 text-sm font-medium">
            <Plus className="w-4 h-4" />
            <span>Add Session</span>
          </button>
        </div>

        <div className="space-y-4">
          {upcomingSessions.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">{session.type}</h3>
                  <p className="text-sm text-slate-600">{session.domain}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{session.time}</span>
                </div>
                <div className="text-slate-500">{session.duration}</div>
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          AI-Powered Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800 mb-1">
                  Focus Area Detected
                </h3>
                <p className="text-sm text-amber-700 mb-2">
                  Your "Physiological Integrity" scores suggest increased
                  practice needed in cardiovascular and respiratory systems.
                </p>
                <button className="text-xs text-amber-800 font-medium hover:underline">
                  Start targeted practice →
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800 mb-1">
                  Great Progress!
                </h3>
                <p className="text-sm text-green-700 mb-2">
                  Your consistency this week is excellent. Consider adding one
                  extra session to maximize momentum.
                </p>
                <button className="text-xs text-green-800 font-medium hover:underline">
                  Add bonus session →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
