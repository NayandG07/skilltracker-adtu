import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Award,
  Clock,
  BookOpen,
  Printer
} from 'lucide-react';
import { DIAGNOSTIC_RESULT_RECORD } from '../data/mockData';

export const DiagnosticResultView = () => {
  const { id } = useParams();
  const report = DIAGNOSTIC_RESULT_RECORD;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {/* Back Navigation */}
      <div className="flex items-center justify-between no-print">
        <Link
          to="/student"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#78756c] hover:text-[#1a1918] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Dashboard</span>
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-2xl bg-white border border-[#e6e3da] text-[#1a1918] hover:bg-[#f4f2eb] shadow-sm transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print Evaluation</span>
        </button>
      </div>

      {/* Hero Score Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm print-clean-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-[#3e7b54]/10 text-[#3e7b54] border border-[#3e7b54]/20">
                {report.status}
              </span>
              <span className="text-xs text-[#78756c] font-mono">{report.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#1a1918]">
              {report.assessmentTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#4f4c46] mt-1.5">
              Student: <span className="text-[#1a1918] font-bold">{report.studentName}</span> &bull; Enrollment: <span className="font-mono">{report.studentId}</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-center shrink-0">
            <span className="text-xs text-[#78756c] uppercase font-bold tracking-wider block">Total Score</span>
            <div className="flex items-baseline justify-center gap-1.5 mt-1">
              <span className="text-3xl sm:text-4xl font-black text-[#3e7b54]">{report.scoreObtained}</span>
              <span className="text-sm font-semibold text-[#78756c]">/ {report.maxScore}</span>
            </div>
            <span className="text-xs font-bold text-[#3e7b54]">{report.percentage}% Grade Point</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm text-[#4f4c46] leading-relaxed">
          <span className="font-bold text-[#1a1918]">Faculty Diagnostic Summary: </span>
          {report.summary}
        </div>
      </div>

      {/* Detailed Questions Review */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-[#1a1918]">
            Diagnostic Question Analysis
          </h2>
          <span className="text-xs sm:text-sm text-[#3e7b54] font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> 3 of 3 Questions Answered Correctly
          </span>
        </div>

        {report.questions.map((q, idx) => (
          <div
            key={q.id}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm print-clean-card space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-[#f4f2eb] border border-[#e6e3da] flex items-center justify-center text-xs font-mono font-bold text-[#1a1918] shrink-0">
                  {idx + 1}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#1a1918] leading-relaxed">
                  {q.questionText}
                </h3>
              </div>

              {/* Resolved Bug: Correct answer displays emerald CheckCircle2, NOT red cross! */}
              {q.isUserCorrect ? (
                <span className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-[#3e7b54] bg-[#3e7b54]/10 border border-[#3e7b54]/20 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-[#3e7b54]" />
                  <span>Correct (+33.3 pts)</span>
                </span>
              ) : (
                <span className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-[#ba3c3c] bg-[#ba3c3c]/10 border border-[#ba3c3c]/20 px-3 py-1 rounded-full">
                  <XCircle className="w-4 h-4 text-[#ba3c3c]" />
                  <span>Incorrect</span>
                </span>
              )}
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {q.options.map((opt) => {
                const isSelected = q.selectedOption === opt.id;
                const isCorrect = opt.isCorrect;

                return (
                  <div
                    key={opt.id}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center gap-3 transition-colors ${
                      isCorrect
                        ? 'bg-[#3e7b54]/10 border-[#3e7b54]/40 text-[#1a1918] font-medium'
                        : isSelected && !isCorrect
                        ? 'bg-[#ba3c3c]/10 border-[#ba3c3c]/40 text-[#1a1918]'
                        : 'bg-[#f4f2eb] border-[#e6e3da] text-[#78756c]'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        isCorrect
                          ? 'bg-[#3e7b54] text-white'
                          : isSelected
                          ? 'bg-[#ba3c3c] text-white'
                          : 'bg-white text-[#78756c] border border-[#e6e3da]'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="flex-1 leading-snug">{opt.text}</span>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-[#3e7b54] shrink-0" />}
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <div className="mt-4 pt-4 border-t border-[#e6e3da] text-xs sm:text-sm text-[#4f4c46] bg-[#f4f2eb] p-4 rounded-2xl">
              <span className="font-bold text-[#1a1918]">Technical Explanation: </span>
              {q.explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
