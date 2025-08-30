import React from 'react';
import { useQuizStore } from '../store/quizStore';
import { useNavigate } from 'react-router-dom';

const Results: React.FC = () => {
  const { results, resetQuiz } = useQuizStore();
  const navigate = useNavigate();
  
  const handleRetry = () => {
    resetQuiz();
    navigate('/quiz');
  };

  const handleDashboard = () => {
    resetQuiz();
    navigate('/dashboard');
  };

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = (results.score / results.total) * 100;
  const getPerformanceMessage = () => {
    if (percentage === 100) return { message: 'Perfect score! 🎉', color: 'text-yellow-600' };
    if (percentage >= 80) return { message: 'Excellent! 🌟', color: 'text-green-600' };
    if (percentage >= 60) return { message: 'Great job! 👍', color: 'text-blue-600' };
    if (percentage >= 40) return { message: 'Good effort! 😊', color: 'text-purple-600' };
    return { message: 'Keep practicing! 💪', color: 'text-red-600' };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Quiz Results</h2>
          
          {/* Score Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl mb-8 border-2 border-blue-100">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {results.score}<span className="text-2xl text-gray-500">/{results.total}</span>
              </div>
              <div className={`text-xl font-semibold ${performance.color} mb-4`}>
                {performance.message}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">{percentage.toFixed(1)}% Correct</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-4 rounded-xl text-center border-2 border-green-100">
                <div className="text-2xl font-bold text-green-600 mb-1">{results.score}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="bg-white p-4 rounded-xl text-center border-2 border-red-100">
                <div className="text-2xl font-bold text-red-600 mb-1">{results.total - results.score}</div>
                <div className="text-sm text-gray-600">Incorrect Answers</div>
              </div>
              <div className="bg-white p-4 rounded-xl text-center border-2 border-blue-100">
                <div className="text-2xl font-bold text-blue-600 mb-1">{formatTime(results.timeTaken)}</div>
                <div className="text-sm text-gray-600">Time Taken</div>
              </div>
            </div>
          </div>
          
          {/* Question Review */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-3">
              Question Review
            </h3>
            <div className="space-y-6">
              {results.results.map((result: any, index: number) => (
                <div key={index} className={`p-6 rounded-xl border-2 ${
                  result.isCorrect 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="font-semibold text-lg mb-3 text-gray-800">
                    Q{index + 1}: {result.question}
                  </div>
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${
                      result.isCorrect 
                        ? 'bg-green-100 border border-green-300 text-green-800' 
                        : 'bg-red-100 border border-red-300 text-red-800'
                    }`}>
                      <span className="font-medium">Your answer:</span> {result.userAnswer || 'Not answered'}
                    </div>
                    {!result.isCorrect && (
                      <div className="p-3 rounded-lg bg-green-100 border border-green-300 text-green-800">
                        <span className="font-medium">Correct answer:</span> {result.correctAnswer}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
            <button
              onClick={handleDashboard}
              className="px-8 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;