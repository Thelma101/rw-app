import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage');
  if (token) {
    try {
      const authState = JSON.parse(token);
      if (authState.state?.token) {
        config.headers.Authorization = `Bearer ${authState.state.token}`;
      }
    } catch (error) {
      console.error('Error parsing auth storage:', error);
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password }),
};

export const quizAPI = {
  startQuiz: (data: {limit?: number}) => 
    api.post('/quiz/start', data),
  
  submitQuiz: (answers: any[], timeTaken: number) => 
    api.post('/quiz/submit', { answers, timeTaken }),
};

export const questionsAPI = {
  getQuestions: () => api.get('/questions'),
  createQuestion: (questionData: any) => api.post('/questions', questionData),
  updateQuestion: (id: string, questionData: any) => api.put(`/questions/${id}`, questionData),
  deleteQuestion: (id: string) => api.delete(`/questions/${id}`),
};