import React from 'react';

interface QuestionProps {
  question: {
    id: string | number;
    text: string;
    options: Record<string, string>;
  };
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
        {question.text}
      </h3>
      <div className="space-y-3">
        {Object.entries(question.options).map(([key, value]) => (
          <div 
            key={key}
            className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
              selectedAnswer === key 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200'
            }`}
            onClick={() => onAnswerSelect(key)}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
              selectedAnswer === key 
                ? 'border-blue-500 bg-blue-500 text-white' 
                : 'border-gray-300'
            }`}>
              {selectedAnswer === key && (
                <span className="text-xs font-bold">✓</span>
              )}
            </div>
            <input
              type="radio"
              id={`option-${key}`}
              name="quiz-answer"
              value={key}
              checked={selectedAnswer === key}
              onChange={() => onAnswerSelect(key)}
              className="hidden"
            />
            <label 
              htmlFor={`option-${key}`} 
              className="text-gray-700 cursor-pointer flex-1"
            >
              <span className="font-medium text-green-900 mr-2">{key})</span>
              {value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;