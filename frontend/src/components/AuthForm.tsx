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

  const demoEmail = 'demo@readwrite.com';
  const demoPassword = 'demo123456';
  const demoName = 'Demo User';

  const fillDemoCredentials = () => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    if (!isLogin) {
      setName(demoName);
    }
  };

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
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Animated gradient accents */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-200 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-200 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-15 animate-pulse" />

      <div className="card-elevated max-w-md w-full p-8 md:p-10 relative z-10">
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">ReadWrite</h1>
            <p className="text-slate-600 text-base md:text-lg">Assessment Platform</p>
          </div>

          {/* Demo Login Section - Prominently Displayed */}
          <div className="demo-login-box">
            <h4>
              <span className="mr-2">🔑</span>
              Demo Credentials
            </h4>
            <div className="space-y-2 mb-4">
              <div className="demo-credential">
                <span className="demo-label">Email:</span>
                <span className="demo-value">{demoEmail}</span>
              </div>
              <div className="demo-credential">
                <span className="demo-label">Password:</span>
                <span className="demo-value">{demoPassword}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full bg-white hover:bg-emerald-50 text-emerald-700 font-semibold py-2 px-4 rounded-lg border-2 border-emerald-200 transition-all duration-200 text-sm"
            >
              Use Demo Credentials
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert-error mb-6" role="alert">
              <div className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field (Registration Only) */}
            {!isLogin && (
              <div>
                <label className="label-primary">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Enter your full name"
                  required={!isLogin}
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="label-primary">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="label-primary">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Processing...
                </div>
              ) : isLogin ? (
                '🚀 Login to Dashboard'
              ) : (
                '✨ Create Account'
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="text-center mt-8 pt-8 border-t-2 border-slate-200">
            <p className="text-slate-600 mb-3">
              {isLogin
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setEmail('');
                setPassword('');
                setName('');
              }}
              className="btn-secondary w-full"
            >
              {isLogin ? '✍️ Register Now' : '🔐 Login Instead'}
            </button>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-6 text-xs text-slate-500">
            <p>📝 Questions or Issues? Contact our support team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
