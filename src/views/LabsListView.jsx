import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FlaskConical,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCode,
  ArrowRight,
  BookOpen,
  Terminal,
  Play,
  Layers,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudent } from '../context/StudentContext';

export const LabsListView = () => {
  const navigate = useNavigate();
  const { labs } = useStudent();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredLabs = labs.filter((l) => {
    if (activeCategory === 'active') return l.status === 'active';
    if (activeCategory === 'completed') return l.status === 'graded' || l.status === 'submitted';
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="p-2 rounded-xl bg-[#d97757]/10 text-[#d97757] border border-[#d97757]/20">
              <FlaskConical className="w-5 h-5 stroke-[2.2]" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#1a1918]">
              Current Semester Labs & Assessments
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#4f4c46] leading-relaxed max-w-2xl">
            Assam Down Town University continuous evaluation modules. Complete conceptual MCQ quizzes and coding benchmarks before semester cutoffs.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] self-start sm:self-auto">
          {['all', 'active', 'completed'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeCategory === cat
                  ? 'bg-white text-[#1a1918] shadow-xs'
                  : 'text-[#78756c] hover:text-[#1a1918]'
              }`}
            >
              {cat === 'all' ? 'All Labs' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Cards Grid (Matching Design 2 Left Side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLabs.map((lab) => {
          const isGraded = lab.status === 'graded';
          const isSubmitted = lab.status === 'submitted';
          const isDueSoon = lab.id === 'lab-os-05';

          return (
            <motion.div
              key={lab.id}
              whileHover={{ y: -2 }}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Status Chips & Course Code */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {isGraded ? (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-[#3e7b54]/10 text-[#3e7b54] border border-[#3e7b54]/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    ) : isSubmitted ? (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-[#d4973b]/10 text-[#d4973b] border border-[#d4973b]/20 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Under Evaluation
                      </span>
                    ) : isDueSoon ? (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-[#d97757]/15 text-[#d97757] border border-[#d97757]/30 flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-pulse" /> Due in 4 Hours
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-[#f4f2eb] text-[#78756c] border border-[#e6e3da] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due in 2 Days
                      </span>
                    )}

                    <span className="text-xs font-mono font-bold text-[#78756c]">
                      {lab.courseCode}
                    </span>
                  </div>

                  {/* Score Pill */}
                  {lab.score !== undefined ? (
                    <div className="px-3 py-1 rounded-xl bg-[#f4f2eb] border border-[#e6e3da] text-right">
                      <span className="text-[10px] text-[#78756c] uppercase font-bold block">Score</span>
                      <span className="text-xs font-black text-[#3e7b54] font-mono">{lab.score}/100</span>
                    </div>
                  ) : (
                    <div className="px-3 py-1 rounded-xl bg-[#f4f2eb] border border-[#e6e3da] text-right">
                      <span className="text-[10px] text-[#78756c] uppercase font-bold block">Max</span>
                      <span className="text-xs font-black text-[#1a1918] font-mono">{lab.totalMarks} Marks</span>
                    </div>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#1a1918] leading-snug">
                  {lab.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4f4c46] line-clamp-2 leading-relaxed">
                  {lab.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lab.topics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-lg text-[10px] font-medium bg-[#f4f2eb] text-[#78756c]"
                    >
                      {topic}
                    </span>
                  ))}
                  {lab.topics.length > 3 && (
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-[#f4f2eb] text-[#78756c]">
                      +{lab.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#f4f2eb] flex items-center justify-between gap-2">
                <Link
                  to={`/student/detail/${lab.id}`}
                  className="text-xs font-bold text-[#78756c] hover:text-[#1a1918] flex items-center gap-1"
                >
                  <span>Overview & Instructions</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-2">
                  {isGraded ? (
                    <Link
                      to="/student/result/diag-result-502"
                      className="px-4 py-2 rounded-xl bg-[#f4f2eb] hover:bg-[#edeae2] text-[#1a1918] text-xs font-bold transition-colors"
                    >
                      View Result
                    </Link>
                  ) : (
                    <>
                      <Link
                        to={`/student/quiz/${lab.id}`}
                        className="px-3.5 py-2 rounded-xl bg-[#d97757] hover:bg-[#c15f3e] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Take Quiz</span>
                      </Link>
                      <Link
                        to={`/student/workspace/${lab.id}`}
                        className="px-3 py-2 rounded-xl bg-[#1a1918] hover:bg-[#2e2d2a] text-white text-xs font-bold transition-all"
                      >
                        Code
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
