import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Play,
  Terminal,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export const LabDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { labs } = useStudent();

  const lab = labs.find((l) => l.id === id) || labs[0];

  const isCompleted = lab.status === 'graded' || lab.status === 'submitted';

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          to="/student/list"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#78756c] hover:text-[#1a1918] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Continuous Lab Assessments</span>
        </Link>
        <span className="text-xs font-mono font-bold text-[#78756c] uppercase">
          {lab.courseCode} &bull; {lab.id}
        </span>
      </div>

      {/* Main Lab Overview Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-[#d97757]/10 text-[#d97757] border border-[#d97757]/20">
                {lab.courseName || 'Computer Science Lab'}
              </span>
              <span
                className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${
                  isCompleted
                    ? 'bg-[#3e7b54]/10 text-[#3e7b54] border-[#3e7b54]/20'
                    : 'bg-[#d4973b]/10 text-[#d4973b] border-[#d4973b]/20'
                }`}
              >
                {isCompleted ? 'Completed / Graded' : 'Active Assessment'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#1a1918]">
              {lab.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#4f4c46] leading-relaxed max-w-2xl">
              {lab.description}
            </p>
          </div>

          {/* Marks & Duration Pill */}
          <div className="p-5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-center shrink-0 min-w-[140px]">
            <span className="text-[11px] text-[#78756c] uppercase font-bold tracking-wider block">
              Assessment Weight
            </span>
            <div className="flex items-baseline justify-center gap-1 mt-1">
              <span className="text-3xl font-black text-[#1a1918]">{lab.totalMarks}</span>
              <span className="text-xs font-bold text-[#78756c]">Marks</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-2 text-xs font-bold text-[#d97757]">
              <Clock className="w-3.5 h-3.5" />
              <span>{lab.durationMinutes} Minutes</span>
            </div>
          </div>
        </div>

        {/* Topics Covered */}
        <div className="pt-4 border-t border-[#f4f2eb]">
          <span className="text-xs font-bold text-[#78756c] uppercase tracking-wider block mb-2">
            Curriculum Core Topics Covered:
          </span>
          <div className="flex flex-wrap gap-2">
            {lab.topics.map((topic, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-xl text-xs font-medium bg-[#f4f2eb] border border-[#e6e3da] text-[#1a1918]"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Two Action Panels: MCQ Quiz & Programming Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* MCQ Assessment Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:border-[#d97757]/60 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d97757]/10 text-[#d97757] flex items-center justify-center">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h2 className="text-lg font-bold text-[#1a1918]">MCQ Diagnostic Quiz</h2>
            <p className="text-xs sm:text-sm text-[#4f4c46] leading-relaxed">
              Answer conceptual questions on page replacement, Belady anomaly, and memory address translation under strict examination conditions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/student/quiz/${lab.id}`)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] text-white text-xs sm:text-sm font-bold shadow-sm active:scale-98 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isCompleted ? 'Retake Practice Quiz' : 'Start MCQ Assessment'}</span>
          </button>
        </div>

        {/* Programming Workspace Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:border-[#3e7b54]/60 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3e7b54]/10 text-[#3e7b54] flex items-center justify-center">
              <Terminal className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h2 className="text-lg font-bold text-[#1a1918]">Coding Workspace & Benchmark</h2>
            <p className="text-xs sm:text-sm text-[#4f4c46] leading-relaxed">
              Write, compile, and run your C/C++ solution against the automated benchmark suite with test case evaluation and memory constraints.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/student/workspace/${lab.id}`)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#1a1918] hover:bg-[#2e2d2a] text-white text-xs sm:text-sm font-bold shadow-sm active:scale-98 transition-all"
          >
            <Terminal className="w-4 h-4" />
            <span>Open Programming Workspace</span>
          </button>
        </div>
      </div>

      {/* Rules & Guidelines */}
      <div className="p-6 rounded-3xl bg-[#f4f2eb] border border-[#e6e3da] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#78756c]">
          <ShieldCheck className="w-4 h-4 text-[#3e7b54]" />
          <span>Department Examination Guidelines</span>
        </div>
        <ul className="text-xs sm:text-sm text-[#4f4c46] space-y-2 list-disc list-inside">
          <li>Assessment responses are auto-saved in local memory and synchronized with ADTU examination servers.</li>
          <li>In the event of an internet disconnect, your answers are preserved by the PWA offline queue.</li>
          <li>Once the countdown timer reaches zero, the system will automatically submit your recorded answers.</li>
        </ul>
      </div>
    </div>
  );
};
