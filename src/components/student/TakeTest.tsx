import React, { useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { mockTest } from '../../data/mockData';

function TakeTest() {
  const [answers, setAnswers] = useState<number[]>(new Array(mockTest.questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (submitted) return;
    
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    if (answers.includes(-1)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const correctAnswers = answers.reduce((acc, answer, index) => {
      return acc + (answer === mockTest.questions[index].correctAnswer ? 1 : 0);
    }, 0);

    const finalScore = Math.round((correctAnswers / mockTest.questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{mockTest.title}</h2>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            Time: 30 minutes
          </div>
        </div>

        <div className="space-y-8">
          {mockTest.questions.map((question, questionIndex) => (
            <div key={question.id} className="space-y-4">
              <p className="text-lg text-gray-900">
                {questionIndex + 1}. {question.question}
              </p>
              <div className="grid gap-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                    disabled={submitted}
                    className={`flex items-center p-4 border rounded-lg transition-colors
                              ${
                                answers[questionIndex] === optionIndex
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-blue-500'
                              }
                              ${
                                submitted &&
                                optionIndex === question.correctAnswer &&
                                'border-green-500 bg-green-50'
                              }
                              ${
                                submitted &&
                                answers[questionIndex] === optionIndex &&
                                optionIndex !== question.correctAnswer &&
                                'border-red-500 bg-red-50'
                              }
                            `}
                  >
                    <span className="text-sm">{option}</span>
                    {submitted && optionIndex === question.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="mt-8 w-full flex items-center justify-center px-4 py-2 border border-transparent
                     rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Test
          </button>
        ) : (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              Your Score: {score}%
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Thank you for completing the test!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TakeTest;