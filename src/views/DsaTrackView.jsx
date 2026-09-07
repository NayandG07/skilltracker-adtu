import React, { useState } from 'react';
import {
  Terminal,
  CheckCircle2,
  Circle,
  ExternalLink,
  Search,
  Filter,
  Flame,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudent } from '../context/StudentContext';

export const DsaTrackView = () => {
  const { dsaProblems, toggleDsaProblem } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = [
    'All',
    'Arrays',
    'Strings',
    'Two Pointers',
    'Sliding Window',
    'Linked List',
    'Trees',
    'Dynamic Programming',
    'Graphs'
  ];

  const filteredProblems = dsaProblems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || problem.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesCat && matchesDiff;
  });

  const totalSolved = dsaProblems.filter((p) => p.solved).length;
  const progressPercent = Math.round((totalSolved / dsaProblems.length) * 100);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header & Progress Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-[#d97757]/10 text-[#d97757] border border-[#d97757]/20">
                <Terminal className="w-5 h-5 stroke-[2.2]" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#1a1918]">
                LeetCode 300 DSA Track
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#4f4c46] leading-relaxed max-w-2xl">
              Curated core algorithms syllabus for technical interviews and university lab readiness.
              All problem links utilize exact canonical LeetCode slugs.
            </p>
          </div>

          <div className="shrink-0 sm:text-right sm:border-l sm:border-[#e6e3da] sm:pl-6">
            <span className="text-xs sm:text-sm font-semibold text-[#78756c] block uppercase tracking-wider">
              Solved Progress
            </span>
            <div className="flex items-baseline gap-1 mt-1 justify-start sm:justify-end">
              <span className="text-3xl font-black text-[#1a1918]">{totalSolved}</span>
              <span className="text-sm font-semibold text-[#78756c]">
                / {dsaProblems.length} ({progressPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#f4f2eb] h-2.5 rounded-full mt-5 overflow-hidden border border-[#e6e3da]">
          <div
            className="bg-[#d97757] h-full rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#78756c]" />
          <input
            type="text"
            id="dsa-search-input"
            name="dsaSearchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problem title, algorithm type, or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm text-[#1a1918] placeholder-[#9e9a90] focus:outline-none focus:border-[#d97757] transition-colors"
          />
        </div>

        {/* Category Chips */}
        <div data-no-swipe="true" className="flex items-center gap-2 overflow-x-auto pb-1 text-xs sm:text-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl shrink-0 font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1a1918] text-white shadow-sm'
                  : 'bg-[#f4f2eb] text-[#78756c] hover:text-[#1a1918] hover:bg-[#edeae2] border border-[#e6e3da]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Chips */}
        <div className="flex items-center gap-2.5 pt-3 border-t border-[#e6e3da] text-xs sm:text-sm">
          <span className="font-semibold text-[#78756c]">Difficulty:</span>
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-[#d97757] text-white shadow-xs'
                  : 'text-[#78756c] hover:text-[#1a1918] hover:bg-[#f4f2eb]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-3">
        {filteredProblems.length === 0 ? (
          <div className="p-16 text-center text-sm text-[#78756c] rounded-3xl bg-white border border-[#e6e3da] shadow-sm">
            No DSA problems matching your filters.
          </div>
        ) : (
          filteredProblems.map((problem) => (
            <motion.div
              key={problem.id}
              whileHover={{ y: -1 }}
              className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all ${
                problem.solved
                  ? 'bg-[#f4f2eb]/60 border-[#e6e3da]'
                  : 'bg-white border-[#e6e3da] shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Solved Checkbox Trigger */}
                <button
                  type="button"
                  onClick={() => toggleDsaProblem(problem.id)}
                  aria-label={problem.solved ? `Mark ${problem.title} unsolved` : `Mark ${problem.title} solved`}
                  className="shrink-0 p-1 text-[#d97757] hover:scale-110 active:scale-90 transition-transform"
                >
                  {problem.solved ? (
                    <CheckCircle2 className="w-6 h-6 text-[#3e7b54] stroke-[2.2]" />
                  ) : (
                    <Circle className="w-6 h-6 text-[#9e9a90] hover:text-[#d97757] stroke-[1.8]" />
                  )}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-[#78756c]">#{problem.id}</span>
                    <h3
                      className={`text-sm sm:text-base font-bold truncate ${
                        problem.solved ? 'text-[#78756c] line-through' : 'text-[#1a1918]'
                      }`}
                    >
                      {problem.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        problem.difficulty === 'Easy'
                          ? 'bg-[#3e7b54]/10 text-[#3e7b54] border border-[#3e7b54]/20'
                          : problem.difficulty === 'Medium'
                          ? 'bg-[#b87728]/10 text-[#b87728] border border-[#b87728]/20'
                          : 'bg-[#ba3c3c]/10 text-[#ba3c3c] border border-[#ba3c3c]/20'
                      }`}
                    >
                      {problem.difficulty}
                    </span>

                    <span className="text-xs font-medium text-[#78756c]">&bull; {problem.category}</span>
                    {problem.acceptance && (
                      <span className="text-xs text-[#9e9a90] hidden sm:inline">
                        &bull; {problem.acceptance} acceptance
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Canonical LeetCode Link */}
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${problem.slug} on LeetCode`}
                className="shrink-0 ml-3 px-3 py-2 rounded-xl text-[#78756c] hover:text-[#1a1918] hover:bg-[#f4f2eb] transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-semibold"
              >
                <span className="hidden sm:inline">LeetCode</span>
                <ExternalLink className="w-4 h-4 text-[#d97757]" />
              </a>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
