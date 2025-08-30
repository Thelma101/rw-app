import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

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
      navigate('/questions');
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white relative overflow-hidden">
      {/* subtle animated accents on white bg */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-100 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-secondary-100 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 right-1/5 w-20 h-20 bg-success-100 rounded-full blur-xl animate-bounce" />

      <div className="card max-w-md w-full p-8 relative z-10">
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              ReadWrite Assessments
            </h1>
            <p className="text-gray-600 text-lg">
              {isLogin ? 'Welcome back!' : 'Join us today!'}
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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

          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
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

      
    </div>
  );
};

export default AuthForm;