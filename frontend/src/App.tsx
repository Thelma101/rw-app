import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Auth from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Results from './components/Results';
import QuestionsManagement from './components/QuestionsManagement';
// import QuestionManagement from './components/QuestionManagement';


function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route
            path="/auth"
            element={!token ? <Auth /> : <Navigate to="/dashboard" />}
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
          {/* <Route 
            path="/manage-questions" 
            element={token ? <QuestionManagement /> : <Navigate to="/auth" />} 
          /> */}
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/auth"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;