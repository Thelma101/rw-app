import { create } from 'zustand';

interface Question {
  id: number;
  text: string;
  options: Record<string, string>;
  correctAnswer: string;
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: string[];
  timeStarted: Date | null;
  timeEnded: Date | null;
  isLoading: boolean;
  error: string | null;
  results: any;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (index: number, answer: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitQuiz: () => Promise<any>;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  timeStarted: null,
  timeEnded: null,
  isLoading: false,
  error: null,
  results: null,
  
  setQuestions: (questions) => set({ 
    questions, 
    answers: new Array(questions.length).fill(''),
    timeStarted: new Date()
  }),
  
  setAnswer: (index, answer) => {
    const answers = [...get().answers];
    answers[index] = answer;
    set({ answers });
  },
  
  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },
  
  prevQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },
  
  submitQuiz: async () => {
    const { questions, answers, timeStarted } = get();
    const timeTaken = timeStarted ? Math.floor((new Date().getTime() - timeStarted.getTime()) / 1000) : 0;
    
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Calculate results
      let score = 0;
      const results = questions.map((question, index) => {
        const isCorrect = question.correctAnswer === answers[index];
        if (isCorrect) score++;
        return {
          question: question.text,
          userAnswer: answers[index],
          correctAnswer: question.correctAnswer,
          isCorrect
        };
      });
      
      const finalResults = {
        score,
        total: questions.length,
        results,
        timeTaken
      };
      
      set({ results: finalResults, timeEnded: new Date() });
      return finalResults;
    } catch (error) {
      set({ error: 'Failed to submit quiz' });
      throw error;
    }
  },
  
  resetQuiz: () => {
    set({
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      timeStarted: null,
      timeEnded: null,
      error: null,
      results: null
    });
  }
}));