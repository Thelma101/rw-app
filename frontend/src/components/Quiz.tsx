import React, { useState, useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';
import { useAuthStore } from '../store/authStore';
import { quizAPI } from '../services/api';
import Question from './Question';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';

const Quiz: React.FC = () => {
  const { questions, currentQuestionIndex, answers, timeStarted, setQuestions, setAnswer, setResults } = useQuizStore();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const startQuiz = async () => {
      try {
        setIsLoading(true);
        const response = await quizAPI.startQuiz({ limit: 10 });
        // Map backend question fields for UI but keep raw for submission
        const rawQuestions = response.data.questions;
        const uiQuestions = rawQuestions.map((q: any) => ({
          id: q.id ?? q.question_id ?? q._id ?? Math.random().toString(36).slice(2),
          text: q.text ?? q.question_text ?? q.question ?? '',
          options: q.options ?? q.choices ?? { A: q.a, B: q.b, C: q.c, D: q.d },
          correctAnswer: q.correct_answer ?? q.correctAnswer,
          __raw: q,
        }));
        setQuestions(uiQuestions as any);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to start quiz');
      } finally {
        setIsLoading(false);
      }
    };

    if (token && questions.length === 0) {
      startQuiz();
    }
  }, [token, setQuestions, questions.length]);

  const handleAnswerSelect = (answer: string) => {
    setAnswer(currentQuestionIndex, answer);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      useQuizStore.getState().nextQuestion();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      useQuizStore.getState().prevQuestion();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const timeTaken = timeStarted ? Math.floor((new Date().getTime() - timeStarted.getTime()) / 1000) : 0;
      const payload = questions.map((q: any, index: number) => ({
        questionId: Number(q.id),
        userAnswer: answers[index],
        isCorrect: (q.correct_answer ?? q.correctAnswer) === answers[index]
      }));
      const { data } = await quizAPI.submitQuiz(payload, timeTaken);
      setResults(data);
      navigate('/results');
    } catch (error) {
      setError('Failed to submit quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No questions available</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">ReadWrite Assessments</h1>
            {timeStarted && <Timer startTime={timeStarted} />}
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="flex space-x-2">
              {answers.filter(a => a).length === questions.length && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  All questions answered
                </span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <Question
            question={currentQuestion}
            selectedAnswer={answers[currentQuestionIndex] || ''}
            onAnswerSelect={handleAnswerSelect}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!answers[currentQuestionIndex] || isSubmitting}
              className="bg-green-500 text-white px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-green-600 transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestionIndex]}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;