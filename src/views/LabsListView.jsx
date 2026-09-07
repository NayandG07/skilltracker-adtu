import React, { useState } from 'react';
import {
  FlaskConical,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Send,
  WifiOff,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useStudent } from '../context/StudentContext';

export const LabsListView = () => {
  const { labs, submitLab, isOnline } = useStudent();
  const [selectedLab, setSelectedLab] = useState(null);
  const [submissionCode, setSubmissionCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState(null);

  const handleOpenModal = (lab) => {
    setSelectedLab(lab);
    setSubmissionCode(lab.starterCode || '// Write your C/C++ solution here...\n');
    setSubmitFeedback(null);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!selectedLab) return;
    setIsSubmitting(true);

    try {
      const result = await submitLab(selectedLab.id, submissionCode);

      if (!result.offline) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch (e) {
          // ignore
        }
      }

      setSubmitFeedback({
        offline: result.offline,
        message: result.offline
          ? 'Stored in IndexedDB offline queue. Will auto-submit once university connection resumes.'
          : 'Submission uploaded to examination server!'
      });

      setTimeout(() => {
        setIsSubmitting(false);
        setSelectedLab(null);
      }, 2000);
    } catch (err) {
      setSubmitFeedback({ error: true, message: 'Failed to record lab submission.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="p-2 rounded-xl bg-[#d97757]/10 text-[#d97757] border border-[#d97757]/20">
            <FlaskConical className="w-5 h-5 stroke-[2.2]" />
          </span>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#1a1918]">
            Continuous Evaluation Labs
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#4f4c46] leading-relaxed max-w-2xl">
          Faculty of Engineering & Technology practical assessments. All assignments are checked for
          plagiarism, memory allocation constraints, and algorithmic performance.
        </p>
      </div>

      {/* Active Labs Section */}
      <div className="space-y-4">
        <h2 className="text-xs sm:text-sm font-bold text-[#78756c] uppercase tracking-wider">
          Active Assessments & Deadlines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {labs
            .filter((l) => l.status === 'active' || l.status === 'submitted')
            .map((lab) => (
              <motion.div
                key={lab.id}
                whileHover={{ y: -2 }}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#f4f2eb] text-[#78756c] border border-[#e6e3da]">
                      {lab.courseCode} &bull; {lab.courseName}
                    </span>

                    {lab.status === 'submitted' ? (
                      <span className="text-xs font-bold text-[#3e7b54] flex items-center gap-1.5 bg-[#3e7b54]/10 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
                        {lab.submissionPayload?.offlineQueued ? 'Queued (Offline)' : 'Submitted'}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-[#b87728] flex items-center gap-1.5 bg-[#b87728]/10 px-2.5 py-1 rounded-full">
                        <Clock className="w-4 h-4" />
                        Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1a1918]">{lab.title}</h3>
                  <p className="text-xs sm:text-sm text-[#4f4c46] mt-2 line-clamp-3 leading-relaxed">
                    {lab.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {lab.topics?.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#f4f2eb] text-[#78756c] border border-[#e6e3da]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-[#e6e3da] flex items-center justify-between">
                  <div className="text-xs sm:text-sm text-[#78756c]">
                    Total Weightage: <span className="text-[#1a1918] font-bold">{lab.totalMarks} Marks</span>
                  </div>

                  {lab.status === 'submitted' ? (
                    <span className="text-xs sm:text-sm text-[#3e7b54] font-bold">Awaiting Evaluation</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenModal(lab)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d97757] hover:bg-[#c15f3e] text-xs sm:text-sm font-bold text-white transition-colors shadow-sm"
                    >
                      <FileCode className="w-4 h-4" />
                      <span>Submit Code</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Completed Labs Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xs sm:text-sm font-bold text-[#78756c] uppercase tracking-wider">
          Completed & Graded Lab Modules
        </h2>

        <div className="space-y-3">
          {labs
            .filter((l) => l.status === 'graded')
            .map((lab) => (
              <div
                key={lab.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e6e3da] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#f4f2eb] text-[#78756c] border border-[#e6e3da]">
                      {lab.courseCode}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#1a1918]">{lab.title}</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#78756c] mt-1.5">
                    Evaluated by <span className="font-semibold text-[#1a1918]">{lab.gradedBy}</span> &bull;{' '}
                    <span className="italic text-[#78756c]">"{lab.remarks}"</span>
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-semibold text-[#78756c] uppercase block">Grade</span>
                    <span className="text-lg sm:text-xl font-black text-[#3e7b54] font-mono">
                      {lab.score} / {lab.totalMarks}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Code Submission Modal */}
      {selectedLab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setSelectedLab(null)}
          />

          <div className="relative w-full max-w-2xl bg-white border border-[#e6e3da] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-[#e6e3da]">
              <div>
                <span className="text-xs font-mono font-bold text-[#78756c]">{selectedLab.courseCode}</span>
                <h3 className="text-base sm:text-lg font-bold text-[#1a1918]">{selectedLab.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLab(null)}
                className="text-[#78756c] hover:text-[#1a1918] text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmission} className="flex-1 flex flex-col mt-4 space-y-3 min-h-0">
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#78756c]">
                <span className="font-semibold">Source Solution (C / C++ / Python)</span>
                {!isOnline && (
                  <span className="text-[#b87728] flex items-center gap-1 font-semibold">
                    <WifiOff className="w-4 h-4" />
                    Offline mode &bull; Queues to IndexedDB
                  </span>
                )}
              </div>

              <textarea
                value={submissionCode}
                onChange={(e) => setSubmissionCode(e.target.value)}
                required
                rows={12}
                className="w-full flex-1 p-4 rounded-2xl bg-[#1f1e1d] text-[#faf9f5] font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d97757] resize-none leading-relaxed"
              />

              {submitFeedback && (
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 font-medium ${
                    submitFeedback.error
                      ? 'bg-[#ba3c3c]/10 text-[#ba3c3c] border border-[#ba3c3c]/20'
                      : 'bg-[#3e7b54]/10 text-[#3e7b54] border border-[#3e7b54]/20'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{submitFeedback.message}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e6e3da]">
                <button
                  type="button"
                  onClick={() => setSelectedLab(null)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#78756c] hover:text-[#1a1918] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold bg-[#d97757] hover:bg-[#c15f3e] text-white rounded-xl shadow-sm transition-colors disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Recording...' : 'Submit Assessment'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
