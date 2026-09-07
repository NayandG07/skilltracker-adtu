import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Zap
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export const DashboardView = () => {
  const {
    student,
    labs,
    dsaProblems,
    triggerTestNotification,
    notificationPermission,
    requestNotificationPermission
  } = useStudent();

  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 11, seconds: 45 });

  // Live countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeLab = labs.find((l) => l.status === 'active');
  const unsolvedDsa = dsaProblems.find((p) => !p.solved);

  // Generate 30 days commit streak grid data
  const streakDays = Array.from({ length: 30 }, (_, i) => {
    const day = 30 - i;
    const isSolved = day <= student.streakDays || day % 3 === 0;
    return { day, solved: isSolved, count: isSolved ? (day % 4) + 1 : 0 };
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="card-pop stagger-1 flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d97757] bg-[#d97757]/10 px-3 py-1 rounded-full border border-[#d97757]/20">
              Session 2026
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#78756c]">Semester 5 &bull; Section A</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#1a1918]">
            Welcome back, {student.name.split(' ')[0]}
          </h1>
          <p className="text-sm sm:text-base text-[#4f4c46] mt-1.5 font-mono">
            {student.id} &bull; {student.program}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {notificationPermission !== 'granted' && (
            <button
              whiletap="true"
              type="button"
              onClick={requestNotificationPermission}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] active:scale-95 text-white transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enable Push Alerts</span>
            </button>
          )}
          <Link
            to="/student/transcript"
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] text-[#1a1918] border border-[#e6e3da] transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#3e7b54]" />
            <span>Official Transcript</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="card-pop stagger-2 p-5 sm:p-6 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:shadow-md hover:scale-[1.015] transition-all">
          <div className="flex items-center justify-between text-[#78756c]">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">Cumulative CGPA</span>
            <div className="w-8 h-8 rounded-xl bg-[#d97757]/10 text-[#d97757] flex items-center justify-center">
              <Award className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#1a1918]">{student.cgpa}</span>
            <span className="text-sm font-semibold text-[#78756c]">/ 10.0</span>
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#3e7b54] mt-2 inline-flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Top 5% in CSE Cohort
          </span>
        </div>

        <div className="card-pop stagger-3 p-5 sm:p-6 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:shadow-md hover:scale-[1.015] transition-all">
          <div className="flex items-center justify-between text-[#78756c]">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">Cohort Standing</span>
            <div className="w-8 h-8 rounded-xl bg-[#f4f2eb] text-[#1a1918] flex items-center justify-center border border-[#e6e3da]">
              <TrendingUp className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#d97757]">#{student.cohortRank}</span>
            <span className="text-sm font-semibold text-[#78756c]">of {student.totalCohortSize}</span>
          </div>
          <Link to="/student/leaderboard" className="text-xs sm:text-sm font-bold text-[#d97757] hover:underline mt-2 inline-block">
            Full 59 standings &rarr;
          </Link>
        </div>

        <div className="card-pop stagger-4 p-5 sm:p-6 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:shadow-md hover:scale-[1.015] transition-all">
          <div className="flex items-center justify-between text-[#78756c]">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">Attendance</span>
            <div className="w-8 h-8 rounded-xl bg-[#3e7b54]/10 text-[#3e7b54] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#1a1918]">{student.attendanceRate}%</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-[#78756c] mt-2 block">Threshold: 75% mandatory</span>
        </div>

        <div className="card-pop stagger-5 p-5 sm:p-6 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:shadow-md hover:scale-[1.015] transition-all">
          <div className="flex items-center justify-between text-[#78756c]">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">DSA 300 Solved</span>
            <div className="w-8 h-8 rounded-xl bg-[#d97757]/10 text-[#d97757] flex items-center justify-center">
              <Terminal className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#1a1918]">{student.totalProblemsSolved}</span>
            <span className="text-sm font-semibold text-[#78756c]">/ 300</span>
          </div>
          <div className="w-full bg-[#f4f2eb] h-2.5 rounded-full mt-3 overflow-hidden border border-[#e6e3da]">
            <div className="bg-[#d97757] h-full rounded-full transition-all duration-500" style={{ width: `${(student.totalProblemsSolved / 300) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Deadline Radar + Next DSA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {activeLab && (
          <div className="card-pop stagger-6 lg:col-span-2 p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-[#b87728]/10 text-[#b87728] border border-[#b87728]/20">
                    <Clock className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span className="text-xs sm:text-sm font-black text-[#1a1918] uppercase tracking-wider">Urgent Deadline Radar</span>
                </div>
                <span className="text-xs sm:text-sm font-mono font-bold px-3 py-1 rounded-lg bg-[#f4f2eb] text-[#b87728] border border-[#e6e3da]">{activeLab.courseCode}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1918] mt-2 mb-2">{activeLab.title}</h3>
              <p className="text-sm sm:text-base text-[#4f4c46] leading-relaxed">{activeLab.description}</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 mt-5 border-t border-[#e6e3da]">
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-sm text-[#78756c]">Time Remaining:</span>
                <div className="flex items-center gap-1.5 font-mono text-base sm:text-lg font-bold text-[#d97757] bg-[#f4f2eb] px-3.5 py-1.5 rounded-xl border border-[#e6e3da]">
                  <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span>:</span>
                  <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span>:</span>
                  <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>
              <Link to="/student/list" className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] text-sm font-bold text-white transition-colors shadow-sm">
                <span>Submit Lab Solution</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        <div className="card-pop stagger-7 p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#78756c] mb-3">
              <span className="font-bold text-sm text-[#1a1918] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#d97757]" />
                <span>Next DSA Problem</span>
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#b87728]/10 text-[#b87728] border border-[#b87728]/20">
                {unsolvedDsa ? unsolvedDsa.difficulty : 'Medium'}
              </span>
            </div>
            <h4 className="text-base font-bold text-[#1a1918] mt-3 leading-snug">
              {unsolvedDsa ? unsolvedDsa.title : 'Longest Substring Without Repeating Characters'}
            </h4>
            <p className="text-sm sm:text-base text-[#4f4c46] mt-1.5">
              Category: <span className="font-bold text-[#1a1918]">{unsolvedDsa ? unsolvedDsa.category : 'Sliding Window'}</span>
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e6e3da] flex items-center justify-between">
            <Link to="/student/dsa-track" className="text-sm font-bold text-[#d97757] hover:underline flex items-center gap-1">
              <span>Solve in DSA Track</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            {unsolvedDsa?.leetcodeUrl && (
              <a href={unsolvedDsa.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-bold text-[#78756c] hover:text-[#1a1918]">
                LeetCode &nearr;
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="card-pop stagger-8 p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#d97757]/10 text-[#d97757] flex items-center justify-center">
              <Flame className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1a1918]">Daily DSA Practice Streak: {student.streakDays} Days</h3>
              <p className="text-sm text-[#78756c] mt-0.5">Commit-style heat tracking over the last 30 academic calendar days</p>
            </div>
          </div>
          <button type="button" onClick={() => triggerTestNotification()} className="self-start sm:self-auto flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#d97757] hover:underline">
            <Sparkles className="w-4 h-4" />
            <span>Test Push Notification</span>
          </button>
        </div>
        <div data-no-swipe="true" className="overflow-x-auto pb-2">
          <div className="flex items-center gap-2 min-w-[540px]">
            {streakDays.map((item, idx) => (
              <div
                key={idx}
                title={`Day ${item.day}: ${item.count} problems solved`}
                className={`flex-1 h-9 rounded-lg transition-all cursor-pointer flex items-center justify-center text-xs font-mono font-bold hover:scale-110 hover:-translate-y-0.5 ${
                  item.solved
                    ? item.count > 2 ? 'bg-[#d97757] text-white shadow-xs' : 'bg-[#d97757]/75 text-white'
                    : 'bg-[#f4f2eb] text-[#9e9a90] border border-[#e6e3da]'
                }`}
              >
                {item.count > 0 ? item.count : ''}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#78756c] mt-2.5">
          <span>30 Days Ago</span>
          <span>Today (Active Streak)</span>
        </div>
      </div>

      {/* Diagnostic Review */}
      <div className="card-pop stagger-8 p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#3e7b54]/10 text-[#3e7b54] border border-[#3e7b54]/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs sm:text-sm uppercase font-black text-[#3e7b54] tracking-wider">Diagnostic Report Verified</span>
            <h4 className="text-base sm:text-lg font-bold text-[#1a1918] mt-0.5">Operating Systems &amp; Data Structures Diagnostic Evaluation</h4>
            <p className="text-sm sm:text-base text-[#4f4c46] mt-1">Score: <span className="font-bold text-[#1a1918]">95/100 (Distinction Passed)</span> &bull; Verified with emerald checkmarks</p>
          </div>
        </div>
        <Link to="/student/result/diag-result-502" className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] text-xs sm:text-sm font-bold text-[#1a1918] border border-[#e6e3da] transition-colors">
          <span>View Scorecard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
