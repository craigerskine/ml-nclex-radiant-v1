import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { mockQuestions } from '../data/mockData';
import { Question } from '../types';
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Lightbulb,
  BookOpen,
  Star,
} from 'lucide-react';

export const StudySession: React.FC = () => {
  const { user, setCurrentSession } = useStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [showRationale, setShowRationale] = useState(false);
  const [sessionQuestions] = useState(() => mockQuestions.slice(0, 5)); // 5 questions per session
  const [sessionStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [confidenceRating, setConfidenceRating] = useState<number | null>(null);

  const currentQuestion = sessionQuestions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestion.id];
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect =
    isAnswered && selectedAnswer === currentQuestion.correctAnswer;
  const isLastQuestion = currentQuestionIndex === sessionQuestions.length - 1;

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setConfidenceRating(null);
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isAnswered) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answerIndex,
      }));
      // Auto-show rationale after a short delay
      setTimeout(() => setShowRationale(true), 500);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Complete session
      const score = Math.round(
        (Object.values(selectedAnswers).filter(
          (answer, index) => answer === sessionQuestions[index].correctAnswer
        ).length /
          sessionQuestions.length) *
          100
      );

      // Update progress and navigate back
      useStore.getState().setCurrentPage('dashboard');

      // Show completion message
      alert(`Session completed! Score: ${score}%`);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowRationale(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowRationale(
        !!selectedAnswers[sessionQuestions[currentQuestionIndex - 1].id]
      );
    }
  };

  const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Session Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">
                Study Session
              </h1>
              <p className="text-sm text-slate-500">
                Question {currentQuestionIndex + 1} of {sessionQuestions.length}{' '}
                • {currentQuestion.domain}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{timeSpent}s</span>
            </div>
            <div className="w-full max-w-xs bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / sessionQuestions.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-800 leading-relaxed">
              {currentQuestion.question}
            </h2>
            <div className="flex space-x-1 ml-4">
              {Array.from({
                length:
                  currentQuestion.difficulty === 'easy'
                    ? 1
                    : currentQuestion.difficulty === 'medium'
                    ? 2
                    : 3,
              }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correctAnswer;
            const showCorrectness = isAnswered && showRationale;

            let buttonClass =
              'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ';

            if (showCorrectness) {
              if (isCorrectAnswer) {
                buttonClass += 'border-green-500 bg-green-50 text-green-800';
              } else if (isSelected && !isCorrectAnswer) {
                buttonClass += 'border-red-500 bg-red-50 text-red-800';
              } else {
                buttonClass += 'border-slate-200 bg-slate-50 text-slate-600';
              }
            } else if (isSelected) {
              buttonClass += 'border-blue-500 bg-blue-50 text-blue-800';
            } else {
              buttonClass +=
                'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{option}</span>
                  {showCorrectness && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 ml-2" />
                  )}
                  {showCorrectness && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-red-600 ml-2" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Confidence Rating */}
        {isAnswered && !showRationale && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              How confident were you in your answer?
            </h3>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setConfidenceRating(rating)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${
                    confidenceRating === rating
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-blue-300 text-blue-500 hover:border-blue-400'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            <p className="text-xs text-blue-500 mt-2">
              1 = Not confident, 5 = Very confident
            </p>
          </div>
        )}

        {/* Rationale */}
        {showRationale && (
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
                </h3>
                <p className="text-slate-700 mb-4">
                  {currentQuestion.rationale.explanation}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">
                      Key Points
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      {currentQuestion.rationale.keyPoints.map(
                        (point, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <span className="text-green-500 mt-1">•</span>
                            <span>{point}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">
                      Common Misconceptions
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {currentQuestion.rationale.commonMisconceptions.map(
                        (misconception, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <span className="text-red-500 mt-1">•</span>
                            <span>{misconception}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-2">
          {sessionQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index < currentQuestionIndex
                  ? 'bg-green-500'
                  : index === currentQuestionIndex
                  ? 'bg-blue-500'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span>{isLastQuestion ? 'Complete Session' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
