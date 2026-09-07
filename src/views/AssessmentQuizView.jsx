import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Send,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStudent } from '../context/StudentContext';

export const AssessmentQuizView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { labs, quizQuestionsMap, submitLab } = useStudent();

  // Find lab or use fallback
  const lab = labs.find((l) => l.id === id) || labs[0];
  const questions = quizQuestionsMap[lab?.id] || quizQuestionsMap['lab-os-05'];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(lab?.durationMinutes ? lab.durationMinutes * 60 : 2700);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Live examination countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h.toString().padStart(2, '0') + ':' : ''}${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitLab(lab.id, JSON.stringify(selectedAnswers));
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      setTimeout(() => {
        navigate(`/student/result/diag-result-502`);
      }, 1200);
    } catch (e) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Distraction-Free Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#e6e3da] shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to={`/student/detail/${lab.id}`}
            className="p-2 rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] text-[#78756c] hover:text-[#1a1918] transition-colors"
            title="Exit assessment"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d97757]">
                Distraction-Free Examination
              </span>
              <span className="text-xs text-[#78756c] font-mono hidden sm:inline">&bull; {lab.courseCode}</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-[#1a1918] truncate max-w-md">
              {lab.title}
            </h1>
          </div>
        </div>

        {/* Live Countdown Timer Pill */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#d97757] text-white font-mono font-bold text-xs sm:text-sm shadow-sm shrink-0">
          <Clock className="w-4 h-4 animate-pulse" />
          <span>Countdown {formatTimer(timeLeft)}</span>
        </div>
      </div>

      {/* Main Examination Grid: Question View & Question Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Question Workspace (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-6">
          {/* Question Header & Topic */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#f4f2eb]">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-[#d97757]/10 text-[#d97757] text-xs font-bold uppercase tracking-wider border border-[#d97757]/20">
                MCQ
              </span>
              {currentQ.topic && (
                <span className="text-xs font-medium text-[#78756c]">
                  Topic: {currentQ.topic}
                </span>
              )}
            </div>
            <span className="text-xs font-mono font-bold text-[#78756c]">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-[#1a1918] leading-relaxed">
              {currentQ.questionText}
            </h2>

            {/* Optional Code Snippet */}
            {currentQ.codeSnippet && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] font-mono text-xs sm:text-sm text-[#1a1918] overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
                {currentQ.codeSnippet}
              </div>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option) => {
              const isSelected = selectedAnswers[currentQ.id] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-[#d97757] bg-[#d97757]/8 shadow-xs ring-1 ring-[#d97757]'
                      : 'border-[#e6e3da] bg-white hover:bg-[#faf9f5] hover:border-[#cfcbc2]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'border-[#d97757] bg-[#d97757] text-white'
                        : 'border-[#cfcbc2] text-[#78756c]'
                    }`}
                  >
                    {option.id}
                  </div>
                  <span className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'font-bold text-[#1a1918]' : 'text-[#4f4c46]'}`}>
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Action Buttons */}
          <div className="pt-6 border-t border-[#f4f2eb] flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentQuestionIndex === 0}
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] disabled:opacity-40 disabled:pointer-events-none text-[#1a1918] text-xs sm:text-sm font-bold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-3">
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#3e7b54] hover:bg-[#346746] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Assessment</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette Sidebar (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1a1918]">
              Question Palette
            </h3>
            <span className="text-xs font-mono font-bold text-[#d97757]">
              {answeredCount}/{questions.length} Answered
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-[#f4f2eb] overflow-hidden">
            <div
              className="h-full bg-[#d97757] transition-all duration-300 rounded-full"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>

          {/* Grid of Question Numbers */}
          <div className="grid grid-cols-5 gap-2.5 pt-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isAnswered = selectedAnswers[q.id] !== undefined;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`h-11 rounded-2xl text-xs font-bold font-mono transition-all flex items-center justify-center ${
                    isCurrent
                      ? 'bg-[#d97757] text-white shadow-sm ring-2 ring-[#d97757]/30 scale-105'
                      : isAnswered
                      ? 'bg-[#3e7b54]/15 text-[#3e7b54] border border-[#3e7b54]/30'
                      : 'bg-[#f4f2eb] text-[#78756c] hover:bg-[#edeae2] border border-[#e6e3da]'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-4 border-t border-[#f4f2eb] space-y-2 text-[11px] text-[#78756c]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#d97757]" />
              <span>Current Question</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3e7b54]/30 border border-[#3e7b54]" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#f4f2eb] border border-[#e6e3da]" />
              <span>Not Answered</span>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="w-full py-3 px-4 rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] border border-[#e6e3da] text-[#1a1918] text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            <span>Finish & Submit</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-xl max-w-md w-full space-y-5 animate-scale-up">
            <div className="w-12 h-12 rounded-2xl bg-[#d97757]/10 text-[#d97757] flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-black text-[#1a1918]">Confirm Assessment Submission</h3>
              <p className="text-xs sm:text-sm text-[#4f4c46] leading-relaxed">
                You have answered <span className="font-bold text-[#1a1918]">{answeredCount}</span> of{' '}
                <span className="font-bold text-[#1a1918]">{questions.length}</span> questions. Once submitted, your answers will be finalized for continuous evaluation.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 px-4 rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] text-[#1a1918] text-xs sm:text-sm font-bold transition-colors"
              >
                Keep Reviewing
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 px-4 rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Evaluating...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
