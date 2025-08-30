import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();

  // Mock data for demonstration
  const stats = {
    quizzesTaken: 12,
    averageScore: 85,
    totalQuestions: 150,
    perfectScores: 3,
    masteryLevel: 'Expert',
    accuracy: '92%'
  };

  const recentActivity = [
    { id: 1, score: 90, total: 100, date: '2 hours ago', category: 'General' },
    { id: 2, score: 75, total: 100, date: '1 day ago', category: 'Technology' },
    { id: 3, score: 95, total: 100, date: '3 days ago', category: 'Music' },
    { id: 4, score: 80, total: 100, date: '1 week ago', category: 'Sports' }
  ];


  const borderColors = [
    'border-r-blue-500',
    'border-r-green-900',
    'border-r-purple-500',
    'border-r-yellow-500',
    'border-r-orange-500',
    'border-r-pink-500'
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600">Ready to test your knowledge? 🧠</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-300">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Online</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors"
              >
                <span className="text-sm text-gray-700 mr-2">Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {Object.entries(stats).map(([key, value], index) => (
            <div 
              key={key}
              className={`bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 border-r-4 ${borderColors[index]} border border-gray-200 hover:scale-105`}
            >
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {key === 'quizzesTaken' && '📊 '}
                {key === 'averageScore' && '🎯 '}
                {key === 'totalQuestions' && '❓ '}
                {key === 'perfectScores' && '⭐ '}
                {key === 'masteryLevel' && '🏆 '}
                {key === 'accuracy' && '🎯 '}
                {value}
              </div>
              <div className="text-sm text-gray-600 font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link 
            to="/quiz" 
            className="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start New Quiz</h3>
              <p className="text-gray-600">Test your knowledge with 10 questions</p>
              <div className="mt-4 inline-flex items-center text-gray-700 group-hover:text-gray-900">
                <span>Start now</span>
                <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          <Link 
            to="/manage-questions" 
            className="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Manage Questions</h3>
              <p className="text-gray-600">Create and edit quiz content</p>
              <div className="mt-4 inline-flex items-center text-gray-700 group-hover:text-gray-900">
                <span>Manage</span>
                <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          <Link 
            to="/history" 
            className="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">View Analytics</h3>
              <p className="text-gray-600">See your performance metrics</p>
              <div className="mt-4 inline-flex items-center text-gray-700 group-hover:text-gray-900">
                <span>View</span>
                <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm mb-8 border border-gray-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity 📝</h2>
            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                <div className="flex items-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 ${
                    activity.score >= 90 ? 'bg-green-100 border-green-400' : 
                    activity.score >= 70 ? 'bg-blue-100 border-blue-400' : 'bg-orange-100 border-orange-400'
                  }`}>
                    <span className="text-lg font-bold text-gray-900">{activity.score}%</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-gray-900 font-semibold">{activity.category} Quiz</h4>
                    <p className="text-gray-500 text-sm">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-900 font-semibold">{activity.score}/{activity.total}</div>
                  <div className="text-sm text-gray-500">correct answers</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-300">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Progress 📅</h3>
          <div className="h-32 bg-gray-50 rounded-xl flex items-end justify-between p-4 border border-gray-200">
            {[40, 65, 75, 85, 90, 78, 82].map((height, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-6 bg-gradient-to-t from-gray-400 to-gray-600 rounded-t transition-all duration-500 hover:from-gray-500 hover:to-gray-700"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2 font-medium">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>Monday</span>
            <span>Sunday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;