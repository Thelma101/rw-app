import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

// SVG Icons as components for better visual design
const ChartIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const QuestionIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const TrendIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CogIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ChartPieIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

const Dashboard: React.FC = () => {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const stats = [
    { 
      label: 'Quizzes Taken', 
      value: '12', 
      icon: ChartIcon, 
      color: 'emerald',
      trend: '+3 this week'
    },
    { 
      label: 'Average Score', 
      value: '85%', 
      icon: TargetIcon, 
      color: 'blue',
      trend: '+5% improvement'
    },
    { 
      label: 'Total Questions', 
      value: '150', 
      icon: QuestionIcon, 
      color: 'violet',
      trend: 'Answered'
    },
    { 
      label: 'Perfect Scores', 
      value: '3', 
      icon: StarIcon, 
      color: 'amber',
      trend: '25% of quizzes'
    },
    { 
      label: 'Mastery Level', 
      value: 'Expert', 
      icon: TrophyIcon, 
      color: 'rose',
      trend: 'Top 10%'
    },
    { 
      label: 'Accuracy', 
      value: '92%', 
      icon: TrendIcon, 
      color: 'cyan',
      trend: 'Excellent'
    }
  ];

  const recentActivity = [
    { id: 1, score: 90, total: 100, date: '2 hours ago', category: 'General Knowledge' },
    { id: 2, score: 75, total: 100, date: '1 day ago', category: 'Technology' },
    { id: 3, score: 95, total: 100, date: '3 days ago', category: 'Music & Arts' },
    { id: 4, score: 80, total: 100, date: '1 week ago', category: 'Sports' }
  ];

  const handleLogout = () => {
    clearAuth();
    navigate('/auth');
  };

  const getScoreClass = (score: number) => {
    if (score >= 90) return 'activity-score-excellent';
    if (score >= 70) return 'activity-score-good';
    return 'activity-score-average';
  };

  const colorClasses: Record<string, string> = {
    emerald: 'stat-card-emerald',
    blue: 'stat-card-blue',
    violet: 'stat-card-violet',
    amber: 'stat-card-amber',
    rose: 'stat-card-rose',
    cyan: 'stat-card-cyan'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Modern Header */}
      <header className="page-header">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  Welcome back, <span className="text-gradient">{user?.name}</span>
                </h1>
                <p className="text-slate-500 text-sm font-medium">
                  Ready to challenge yourself today?
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-4 py-2.5 rounded-xl border border-emerald-200">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2.5 animate-pulse"></div>
                <span className="text-sm font-semibold">Online</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center gap-2 !py-2.5 !px-4"
              >
                <span className="hidden sm:inline">Sign Out</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Premium Stats Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Your Statistics</h2>
            <span className="text-sm text-slate-500 font-medium">Last 30 days</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className={`stat-card ${colorClasses[stat.color]} animate-slide-up stagger-${index + 1}`}
                  style={{ opacity: 0 }}
                >
                  <div className="stat-card-icon">
                    <IconComponent />
                  </div>
                  <div className="stat-card-value">{stat.value}</div>
                  <div className="stat-card-label">{stat.label}</div>
                  <div className="mt-3 text-xs font-medium text-slate-400">{stat.trend}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Premium Action Cards */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/quiz" className="action-card action-card-emerald group">
              <div className="action-card-icon-wrapper text-white">
                <PlayIcon />
              </div>
              <h3 className="action-card-title">Start New Quiz</h3>
              <p className="action-card-description">
                Challenge yourself with a fresh set of questions and track your progress
              </p>
              <div className="action-card-cta">
                <span>Begin Quiz</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
            </Link>

            <Link to="/questions" className="action-card action-card-blue group">
              <div className="action-card-icon-wrapper text-white">
                <CogIcon />
              </div>
              <h3 className="action-card-title">Manage Questions</h3>
              <p className="action-card-description">
                Create, edit, and organize quiz questions for your learning journey
              </p>
              <div className="action-card-cta">
                <span>Open Manager</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
            </Link>

            <Link to="/results" className="action-card action-card-violet group">
              <div className="action-card-icon-wrapper text-white">
                <ChartPieIcon />
              </div>
              <h3 className="action-card-title">View Results</h3>
              <p className="action-card-description">
                Analyze your performance history and identify areas for improvement
              </p>
              <div className="action-card-cta">
                <span>See Analytics</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all duration-500"></div>
            </Link>
          </div>
        </section>

        {/* Recent Activity & Weekly Progress Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <section className="card p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Recent Activity
              </h2>
              <span className="badge-secondary">Last 7 days</span>
            </div>

            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item group">
                  <div className="flex items-center gap-4">
                    <div className={getScoreClass(activity.score)}>
                      {activity.score}%
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {activity.category}
                      </h4>
                      <p className="text-sm text-slate-500">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{activity.score}/{activity.total}</div>
                    <div className="text-xs text-slate-500">correct</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Weekly Progress */}
          <section className="card p-8">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              Weekly Progress
            </h2>
            
            <div className="h-44 bg-gradient-to-b from-slate-50/50 to-white rounded-2xl flex items-end justify-between p-5 border border-slate-100 gap-3">
              {[40, 65, 75, 85, 90, 78, 82].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div
                    className="chart-bar w-full cursor-pointer"
                    style={{ height: `${height}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white text-center pt-2">
                      {height}%
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 mt-3 font-semibold group-hover:text-emerald-600 transition-colors">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"></div>
                <span className="text-sm text-slate-600 font-medium">Score %</span>
              </div>
              <span className="text-sm font-semibold text-emerald-600">Avg: 79%</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
