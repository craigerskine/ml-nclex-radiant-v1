import React from 'react';
import { useStore } from '../store/useStore';
import { 
  TrendingUp, 
  Target, 
  Calendar,
  Award,
  BookOpen,
  CheckCircle2,
  BarChart3,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';

export const Progress: React.FC = () => {
  const { user, progress, achievements } = useStore();

  if (!user || !progress) return null;

  // Mock historical data for charts
  const performanceHistory = [
    { day: 'Mon', score: 68, questions: 8 },
    { day: 'Tue', score: 72, questions: 12 },
    { day: 'Wed', score: 75, questions: 10 },
    { day: 'Thu', score: 78, questions: 15 },
    { day: 'Fri', score: 76, questions: 13 },
    { day: 'Sat', score: 82, questions: 18 },
    { day: 'Today', score: 85, questions: 12 },
  ];

  const domainRadarData = Object.entries(progress.domainScores).map(([domain, score]) => ({
    domain: domain.split(' ').slice(0, 3).join(' '), // Shorten domain names
    performance: score,
    confidence: progress.confidenceScores[domain] * 10 // Scale to 0-100
  }));

  const weeklyGoals = [
    { week: 'Week 1', target: 50, completed: 62 },
    { week: 'Week 2', target: 75, completed: 73 },
    { week: 'Week 3', target: 100, completed: 85 },
    { week: 'Week 4', target: 125, completed: 98 },
  ];

  const earnedAchievements = achievements.filter(a => a.earned);
  const totalAchievements = achievements.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Progress Analytics</h1>
          <p className="text-slate-600">Track your journey to NCLEX success</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl">
          <div className="text-center">
            <p className="text-sm text-green-100">Readiness Score</p>
            <p className="text-2xl font-bold">{progress.readinessScore}%</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Total</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 mb-1">{progress.totalQuestions}</p>
          <p className="text-sm text-slate-600">Questions Completed</p>
          <div className="mt-3 flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12 this week
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 mb-1">
            {Math.round((progress.correctAnswers / progress.totalQuestions) * 100)}%
          </p>
          <p className="text-sm text-slate-600">Overall Accuracy</p>
          <div className="mt-3 flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            +3% this week
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Streak</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 mb-1">{progress.currentStreak}</p>
          <p className="text-sm text-slate-600">Day Streak</p>
          <div className="mt-3 flex items-center text-xs text-slate-400">
            Best: {progress.longestStreak} days
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Earned</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 mb-1">{earnedAchievements.length}/{totalAchievements}</p>
          <p className="text-sm text-slate-600">Achievements</p>
          <div className="mt-3">
            <div className="w-full bg-slate-200 rounded-full h-1">
              <div 
                className="bg-purple-500 h-1 rounded-full" 
                style={{ width: `${(earnedAchievements.length / totalAchievements) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Performance Trend</h3>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Domain Radar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Domain Analysis</h3>
            <Target className="w-5 h-5 text-slate-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={domainRadarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="domain" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar 
                name="Performance" 
                dataKey="performance" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar 
                name="Confidence" 
                dataKey="confidence" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Goals Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Weekly Goals</h3>
          <Calendar className="w-5 h-5 text-slate-400" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyGoals}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="target" fill="#e2e8f0" name="Target" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completed" fill="#3b82f6" name="Completed" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Domain Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Domain Performance Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(progress.domainScores).map(([domain, score]) => (
            <div key={domain} className="p-4 bg-slate-50 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-slate-800 text-sm">{domain}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  score >= 80 ? 'bg-green-100 text-green-800' :
                  score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {score >= 80 ? 'Strong' : score >= 60 ? 'Good' : 'Needs Work'}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Performance</span>
                    <span className="font-medium">{score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        score >= 80 ? 'bg-green-500' :
                        score >= 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Confidence</span>
                    <span className="font-medium">{progress.confidenceScores[domain]}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${progress.confidenceScores[domain] * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};