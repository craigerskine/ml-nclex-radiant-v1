import React from 'react';
import { useStore } from '../store/useStore';
import {
  Calendar,
  TrendingUp,
  Target,
  Clock,
  Award,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { user, progress, achievements } = useStore();

  if (!user || !progress) return null;

  const daysUntilExam = differenceInDays(new Date(user.examDate), new Date());
  const examDate = format(new Date(user.examDate), 'MMMM dd, yyyy');

  const earnedAchievements = achievements.filter((a) => a.earned);
  const nextAchievement = achievements.find((a) => !a.earned);

  const todayStats = {
    questionsAnswered: 12,
    timeSpent: 25,
    accuracyToday: 83,
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              {daysUntilExam > 0
                ? `${daysUntilExam} days until your ${user.examType} exam`
                : 'Your exam is today! Good luck!'}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:text-right">
            <p className="text-blue-100 text-sm">Exam Date</p>
            <p className="text-xl font-semibold">{examDate}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Readiness Score</p>
              <p className="text-3xl font-bold text-green-600">
                {progress.readinessScore}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-700"
                style={{ width: `${progress.readinessScore}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Current Streak</p>
              <p className="text-3xl font-bold text-orange-600">
                {progress.currentStreak}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Best: {progress.longestStreak} days
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Questions Done</p>
              <p className="text-3xl font-bold text-blue-500">
                {progress.totalQuestions}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">
            {Math.round(
              (progress.correctAnswers / progress.totalQuestions) * 100
            )}
            % accuracy
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Today's Progress</p>
              <p className="text-3xl font-bold text-purple-600">
                {todayStats.questionsAnswered}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {todayStats.timeSpent} minutes studied
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Study Progress */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Domain Performance
            </h2>
            <button className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center">
              View Details <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="space-y-4">
            {Object.entries(progress.domainScores).map(([domain, score]) => (
              <div key={domain}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    {domain}
                  </span>
                  <span className="text-sm text-slate-500">{score}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${
                      score >= 80
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : score >= 60
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  Confidence: {progress.confidenceScores[domain]}/10
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Achievements */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => useStore.getState().setCurrentPage('study')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-500 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Start Study Session
              </button>
              <button
                onClick={() => useStore.getState().setCurrentPage('progress')}
                className="w-full bg-white border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-50 transition-all duration-200"
              >
                Review Progress
              </button>
              <button
                onClick={() => useStore.getState().setCurrentPage('planner')}
                className="w-full bg-white border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-50 transition-all duration-200"
              >
                Update Study Plan
              </button>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Achievements
            </h3>
            <div className="space-y-3">
              {earnedAchievements.slice(-3).map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg"
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}

              {nextAchievement && (
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                  <span className="text-2xl opacity-50">
                    {nextAchievement.icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {nextAchievement.title}
                    </p>
                    <p className="text-xs text-slate-400">
                      {nextAchievement.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
