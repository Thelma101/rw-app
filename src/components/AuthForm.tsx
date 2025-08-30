import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useQuizStore } from '../store/quizStore';
import { authAPI } from '../services/api';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  
  const { setAuth } = useAuthStore();
  const { setQuestions } = useQuizStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      let response;
      if (isLogin) {
        response = await authAPI.login(email, password);
      } else {
        response = await authAPI.register(name, email, password);
      }
      
      setAuth(response.data.token, response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      <div className="card max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-400/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary-400/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-success-400/20 rounded-full animate-bounce"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
              QuizMaster
            </h1>
            <p className="text-white/80 text-lg">
              {isLogin ? 'Welcome back!' : 'Join us today!'}
            </p>
          </div>

          {error && (
            <div className="bg-red-400/20 border border-red-400/30 text-red-100 p-4 rounded-xl mb-6 backdrop-blur-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-white/90 mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field bg-white/20 text-white placeholder-white/60 border-white/30"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-white/90 mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field bg-white/20 text-white placeholder-white/60 border-white/30"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field bg-white/20 text-white placeholder-white/60 border-white/30"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : isLogin ? (
                'Login to Quiz'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-white/20">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              {isLogin ? (
                <>Need an account? <span className="text-primary-200 font-semibold">Register here</span></>
              ) : (
                <>Already have an account? <span className="text-primary-200 font-semibold">Login here</span></>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AuthForm;