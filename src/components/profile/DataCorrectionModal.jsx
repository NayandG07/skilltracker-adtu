import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const DataCorrectionModal = () => {
  const { isCorrectionModalOpen, setIsCorrectionModalOpen, student } = useStudent();
  const [field, setField] = useState('cgpa');
  const [reason, setReason] = useState('');
  const [referenceDocs, setReferenceDocs] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isCorrectionModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsCorrectionModalOpen(false);
      setReason('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
        onClick={() => setIsCorrectionModalOpen(false)}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative w-full max-w-lg bg-white border border-[#e6e3da] rounded-3xl shadow-2xl p-6 sm:p-8 z-10"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#e6e3da]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#d97757]" />
            <h3 className="text-base sm:text-lg font-bold text-[#1a1918]">
              Request Academic Data Correction
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCorrectionModalOpen(false)}
            className="p-1.5 rounded-xl text-[#78756c] hover:text-[#1a1918] hover:bg-[#f4f2eb]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#3e7b54]/10 text-[#3e7b54] flex items-center justify-center mx-auto border border-[#3e7b54]/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-[#1a1918]">Correction Ticket Dispatched</h4>
            <p className="text-xs sm:text-sm text-[#4f4c46] max-w-sm mx-auto">
              Your inquiry has been submitted to the Department of CSE Examination Committee and
              assigned Ticket #REQ-2026-047.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm text-[#4f4c46]">
              <span className="font-bold text-[#1a1918]">Official Student Record: </span>
              {student.name} ({student.id}) | Current CGPA: <span className="text-[#1a1918] font-bold">{student.cgpa}</span>
            </div>

            <div>
              <label htmlFor="correction-field" className="block text-xs sm:text-sm font-semibold text-[#1a1918] mb-1.5">
                Discrepancy Category
              </label>
              <select
                id="correction-field"
                name="correctionField"
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm text-[#1a1918] focus:outline-none focus:border-[#d97757]"
              >
                <option value="cgpa">Cumulative CGPA Discrepancy</option>
                <option value="attendance">Biometric Attendance Record</option>
                <option value="sgpa_sem4">Semester 4 SGPA Evaluation</option>
                <option value="lab_marks">Continuous Lab Marks Re-totaling</option>
              </select>
            </div>

            <div>
              <label htmlFor="correction-reason" className="block text-xs sm:text-sm font-semibold text-[#1a1918] mb-1.5">
                Statement of Discrepancy & Reason
              </label>
              <textarea
                id="correction-reason"
                name="correctionReason"
                rows={3}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Detail the discrepancy between physical grade sheet and SkillTracker portal..."
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm text-[#1a1918] placeholder-[#9e9a90] focus:outline-none focus:border-[#d97757]"
              />
            </div>

            <div>
              <label htmlFor="correction-ref" className="block text-xs sm:text-sm font-semibold text-[#1a1918] mb-1.5">
                Supporting Grade Card Ref / Serial No.
              </label>
              <input
                id="correction-ref"
                name="correctionRef"
                type="text"
                value={referenceDocs}
                onChange={(e) => setReferenceDocs(e.target.value)}
                placeholder="e.g. ADTU-GRADE-SEM4-2026-088"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm text-[#1a1918] placeholder-[#9e9a90] focus:outline-none focus:border-[#d97757]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e6e3da]">
              <button
                type="button"
                onClick={() => setIsCorrectionModalOpen(false)}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#78756c] hover:text-[#1a1918] rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold bg-[#d97757] hover:bg-[#c15f3e] text-white rounded-2xl shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Verification Request</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
