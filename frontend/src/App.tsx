import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Results from './components/Results';
import QuestionsManagement from './components/QuestionsManagement';

function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Routes>
          <Route
            path="/auth"
            element={!token ? <AuthForm /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/auth" />}
          />
          <Route
            path="/quiz"
            element={token ? <Quiz /> : <Navigate to="/auth" />}
          />
          <Route
            path="/results"
            element={token ? <Results /> : <Navigate to="/auth" />}
          />
          <Route
            path="/questions"
            element={token ? <QuestionsManagement /> : <Navigate to="/auth" />}
          />
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/auth"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
