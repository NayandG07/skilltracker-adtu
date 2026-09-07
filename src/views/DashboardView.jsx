import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Terminal,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
  ExternalLink,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export const DashboardView = () => {
  const navigate = useNavigate();
  const {
    student,
    labs,
    dsaProblems,
    triggerTestNotification,
    notificationPermission,
    requestNotificationPermission
  } = useStudent();

  const [timeLeft, setTimeLeft] = useState({ days: 1, hours: 4, minutes: 12, seconds: 30 });

  // Live countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeLab = labs.find((l) => l.status === 'active') || labs[0];
  const solvedDsaCount = dsaProblems.filter((p) => p.solved).length;
  const totalDsaCount = dsaProblems.length;
  const recentDsaSolved = dsaProblems.filter((p) => p.solved).slice(0, 4);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* University Header & Student Profile Greeting */}
      <div className="card-pop stagger-1 p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#d97757]/10 text-[#d97757]">
              <GraduationCap className="w-4 h-4 stroke-[2.2]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#d97757]">
              Assam Down Town University
            </span>
            <span className="text-xs text-[#78756c] font-medium">&bull; Faculty of Engineering & Technology</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1a1918]">
            {student.name} &mdash; <span className="text-[#78756c] font-medium text-lg sm:text-xl">B.Tech CSE Semester 5</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#4f4c46] font-mono">
            {student.id} &bull; Track: IBM Systems &bull; Section A
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {notificationPermission !== 'granted' && (
            <button
              type="button"
              onClick={requestNotificationPermission}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] text-white transition-all shadow-sm active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enable Push Radar</span>
            </button>
          )}

          <Link
            to="/student/transcript"
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] text-[#1a1918] border border-[#e6e3da] transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#3e7b54]" />
            <span>Official Transcript</span>
          </Link>
        </div>
      </div>

      {/* Urgent Deadline Alert Banner (Matching Design 1 Mockup) */}
      <div className="card-pop stagger-2 p-6 sm:p-7 rounded-3xl bg-[#d97757] text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
              Due Soon &bull; Continuous Lab Evaluation
            </span>
            <span className="text-xs font-mono text-white/90">Closing Soon</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black mt-1">
            {timeLeft.days > 0 ? `${timeLeft.days} Day ` : ''}{timeLeft.hours} Hours {timeLeft.minutes} Minutes Left
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl">
            {activeLab.title} &mdash; Automated test case benchmark and MCQ diagnostic.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 z-10">
          <Link
            to={`/student/detail/${activeLab.id}`}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-[#d97757] hover:bg-[#f4f2eb] text-xs sm:text-sm font-black shadow-md transition-all active:scale-95"
          >
            <span>Start Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Subtle decorative background circle */}
        <div className="absolute -right-8 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* 4 Stat Overview Pills */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="p-5 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-[#78756c]">
            <span className="text-xs font-bold uppercase tracking-wider">Cumulative CGPA</span>
            <div className="w-8 h-8 rounded-xl bg-[#d97757]/10 text-[#d97757] flex items-center justify-center">
              <Award className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-black tracking-tight text-[#1a1918]">{student.cgpa}</span>
            <span className="text-xs font-semibold text-[#78756c]">/ 10.0</span>
          </div>
          <span className="text-xs font-bold text-[#3e7b54] mt-2 inline-flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Top 2% in Department
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-[#78756c]">
            <span className="text-xs font-bold uppercase tracking-wider">Cohort Standing</span>
            <div className="w-8 h-8 rounded-xl bg-[#f4f2eb] text-[#1a1918] flex items-center justify-center border border-[#e6e3da]">
              <Award className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-black tracking-tight text-[#d97757]">#{student.cohortRank}</span>
            <span className="text-xs font-semibold text-[#78756c]">of 137 Students</span>
          </div>
          <Link to="/student/leaderboard" className="text-xs font-bold text-[#d97757] hover:underline mt-2 inline-block">
            View cohort leaderboard &rarr;
          </Link>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-[#78756c]">
            <span className="text-xs font-bold uppercase tracking-wider">Attendance Rate</span>
            <div className="w-8 h-8 rounded-xl bg-[#3e7b54]/10 text-[#3e7b54] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-black tracking-tight text-[#1a1918]">{student.attendanceRate}%</span>
          </div>
          <span className="text-xs font-medium text-[#78756c] mt-2 block">Threshold: 75% mandatory</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-[#78756c]">
            <span className="text-xs font-bold uppercase tracking-wider">DSA 300 Solved</span>
            <div className="w-8 h-8 rounded-xl bg-[#d97757]/10 text-[#d97757] flex items-center justify-center">
              <Terminal className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-black tracking-tight text-[#1a1918]">{student.totalProblemsSolved}</span>
            <span className="text-xs font-semibold text-[#78756c]">/ 300</span>
          </div>
          <div className="w-full bg-[#f4f2eb] h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#d97757] h-full rounded-full transition-all duration-500"
              style={{ width: `${(student.totalProblemsSolved / 300) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Two Hero Cards: LeetCode 300 & Curriculum Lab Assignments (Matching Design 1 Mockup) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hero Card 1: LeetCode 300 DSA Practice */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-[#d97757]/10 text-[#d97757] text-xs font-bold uppercase tracking-wider border border-[#d97757]/20">
                  DSA Practice
                </span>
                <span className="text-xs text-[#78756c]">Semester 1–6 Roadmap</span>
              </div>
              <Link to="/student/dsa-track" className="text-xs font-bold text-[#d97757] hover:underline flex items-center gap-1">
                <span>View All 300</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <h3 className="text-xl font-black text-[#1a1918]">LeetCode 300 DSA Track</h3>

            {/* Circular Progress Layout */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-4 rounded-2xl bg-[#faf9f5] border border-[#e6e3da]">
              {/* Circular Ring Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-[#e6e3da]"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-[#d97757]"
                    strokeWidth="9"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * (student.totalProblemsSolved / 300))}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-black text-[#1a1918]">{student.totalProblemsSolved}</span>
                  <span className="text-[10px] text-[#78756c] font-bold uppercase tracking-wider">/ 300</span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 text-center sm:text-left">
                <span className="text-xs font-bold text-[#1a1918] block">Master Fundamental Patterns</span>
                <p className="text-xs text-[#4f4c46] leading-relaxed">
                  Sliding Window, Two Pointers, Dynamic Programming, and Graph Traversals curated for campus placements.
                </p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-xs font-mono font-bold text-[#78756c]">
                  <span>142 Solved</span>
                  <span>&bull;</span>
                  <span>158 Pending</span>
                </div>
              </div>
            </div>

            {/* Recently Solved Challenges */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78756c] block">
                Recently Solved in Current Track:
              </span>
              <div className="space-y-1.5">
                {recentDsaSolved.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#f4f2eb] text-xs"
                  >
                    <span className="font-semibold text-[#1a1918] truncate max-w-[240px]">{p.title}</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-white border border-[#e6e3da] text-[#3e7b54]">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/student/dsa-track"
            className="w-full py-3 rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] text-white text-xs sm:text-sm font-bold shadow-sm transition-all text-center block active:scale-98"
          >
            Launch LeetCode 300 Workspace
          </Link>
        </div>

        {/* Hero Card 2: Curriculum Lab Assignments */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-[#3e7b54]/10 text-[#3e7b54] text-xs font-bold uppercase tracking-wider border border-[#3e7b54]/20">
                  Curriculum Core
                </span>
                <span className="text-xs text-[#78756c]">Continuous Evaluation</span>
              </div>
              <Link to="/student/list" className="text-xs font-bold text-[#d97757] hover:underline flex items-center gap-1">
                <span>View All Labs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <h3 className="text-xl font-black text-[#1a1918]">Curriculum Lab Assessments</h3>

            {/* Circular Progress Layout */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-4 rounded-2xl bg-[#faf9f5] border border-[#e6e3da]">
              {/* Circular Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-[#e6e3da]"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-[#3e7b54]"
                    strokeWidth="9"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * (student.totalLabsCompleted / student.totalLabsAssigned))}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-black text-[#1a1918]">85%</span>
                  <span className="text-[9px] text-[#78756c] font-bold uppercase tracking-wider">Completed</span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 text-center sm:text-left">
                <span className="text-xs font-bold text-[#1a1918] block">18 of 20 Labs Completed</span>
                <p className="text-xs text-[#4f4c46] leading-relaxed">
                  Internal assessments, MCQs, and programming labs for your current semester coursework.
                </p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-xs font-mono font-bold text-[#78756c]">
                  <span>2 Active / Pending</span>
                </div>
              </div>
            </div>

            {/* Subject Mastery Progress Bars */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78756c] block">
                Subject Mastery Distribution:
              </span>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Operating Systems (CS502)</span>
                    <span className="font-mono text-[#d97757]">92%</span>
                  </div>
                  <div className="w-full bg-[#f4f2eb] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#d97757] h-full rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Database Engineering (CS501)</span>
                    <span className="font-mono text-[#3e7b54]">88%</span>
                  </div>
                  <div className="w-full bg-[#f4f2eb] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#3e7b54] h-full rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Computer Networks (CS503)</span>
                    <span className="font-mono text-[#d4973b]">84%</span>
                  </div>
                  <div className="w-full bg-[#f4f2eb] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#d4973b] h-full rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/student/list"
            className="w-full py-3 rounded-2xl bg-[#1a1918] hover:bg-[#2e2d2a] text-white text-xs sm:text-sm font-bold shadow-sm transition-all text-center block active:scale-98"
          >
            Access All Lab Evaluations
          </Link>
        </div>
      </div>

      {/* Daily Practice Streak Heatmap */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d97757]/10 text-[#d97757] flex items-center justify-center">
              <Flame className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1a1918]">
                Daily DSA Practice Streak &bull; {student.streakDays} Consecutive Days
              </h3>
              <p className="text-xs text-[#78756c]">
                Continuous coding activity logged to Assam Down Town University academic ledger
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => triggerTestNotification()}
            className="flex items-center gap-1.5 text-xs font-bold text-[#d97757] hover:underline self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test Web Notification</span>
          </button>
        </div>
      </div>
    </div>
  );
};
