import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStudent } from '../context/StudentContext';

export const StudentFeedbackView = () => {
  const { feedbackItems, submitFeedback, student } = useStudent();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Lab Assessment');
  const [priority, setPriority] = useState('Medium');
  const [message, setMessage] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    submitFeedback({
      title,
      category,
      priority,
      message
    });

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    setTitle('');
    setMessage('');
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  const getStatusBadge = (status) => {
    if (status === 'Resolved') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#3e7b54]/10 text-[#3e7b54] border border-[#3e7b54]/20 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Resolved
        </span>
      );
    }
    if (status === 'In Progress') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#d4973b]/10 text-[#d4973b] border border-[#d4973b]/20 flex items-center gap-1">
          <Clock className="w-3 h-3" /> In Progress
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#d97757]/10 text-[#d97757] border border-[#d97757]/20 flex items-center gap-1">
        <HelpCircle className="w-3 h-3" /> Open
      </span>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="p-2 rounded-xl bg-[#d97757]/10 text-[#d97757] border border-[#d97757]/20">
            <MessageSquare className="w-5 h-5 stroke-[2.2]" />
          </span>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#1a1918]">
            Student Academic Grievance & Feedback
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#4f4c46] leading-relaxed max-w-2xl">
          Direct communication channel for B.Tech CSE students at ADTU. Submit questions, report lab evaluation issues, or request feature enhancements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Submit New Feedback Form (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-5">
          <h2 className="text-base font-bold text-[#1a1918]">Submit New Grievance / Feedback</h2>

          {submittedSuccess && (
            <div className="p-3.5 rounded-2xl bg-[#3e7b54]/10 border border-[#3e7b54]/20 text-xs text-[#3e7b54] font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Feedback logged successfully! Faculty moderators notified.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="feedback-category" className="text-xs font-bold text-[#78756c] block mb-1.5 uppercase tracking-wider">
                Category
              </label>
              <select
                id="feedback-category"
                name="feedbackCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm text-[#1a1918] focus:outline-none focus:border-[#d97757]"
              >
                <option value="Lab Assessment">Lab Assessment & Benchmark</option>
                <option value="Academic Query">Academic Records & Attendance</option>
                <option value="Platform Enhancement">Portal Enhancement / Suggestion</option>
                <option value="Bug Report">Technical Bug Report</option>
                <option value="Faculty Moderator">Faculty Communication</option>
              </select>
            </div>

            <div>
              <label htmlFor="feedback-priority" className="text-xs font-bold text-[#78756c] block mb-1.5 uppercase tracking-wider">
                Urgency Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Low', 'Medium', 'High'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      priority === p
                        ? 'border-[#d97757] bg-[#d97757] text-white shadow-xs'
                        : 'border-[#e6e3da] bg-[#f4f2eb] text-[#78756c] hover:bg-[#edeae2]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="feedback-title" className="text-xs font-bold text-[#78756c] block mb-1.5 uppercase tracking-wider">
                Subject Title
              </label>
              <input
                type="text"
                id="feedback-title"
                name="feedbackTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief summary of issue..."
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm text-[#1a1918] placeholder-[#9e9a90] focus:outline-none focus:border-[#d97757]"
                required
              />
            </div>

            <div>
              <label htmlFor="feedback-message" className="text-xs font-bold text-[#78756c] block mb-1.5 uppercase tracking-wider">
                Detailed Message
              </label>
              <textarea
                id="feedback-message"
                name="feedbackMessage"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Describe the issue or feedback with reference to course codes or deadlines..."
                className="w-full p-3.5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm text-[#1a1918] placeholder-[#9e9a90] focus:outline-none focus:border-[#d97757] resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] text-white text-xs sm:text-sm font-bold shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit for Moderation</span>
            </button>
          </form>
        </div>

        {/* Right Side: Submitted Feedback & Status Tracker (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1a1918]">Grievance History & Faculty Replies</h2>
            <span className="text-xs font-mono font-bold text-[#78756c]">
              {feedbackItems.length} Records
            </span>
          </div>

          <div className="space-y-3">
            {feedbackItems.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-white border border-[#e6e3da] shadow-sm hover:border-[#d97757]/40 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {getStatusBadge(item.status)}
                        <span className="text-xs font-mono font-bold text-[#78756c]">
                          #{item.id}
                        </span>
                        <span className="text-xs font-medium text-[#78756c]">&bull; {item.category}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#1a1918]">
                        {item.title}
                      </h3>
                      <span className="text-[11px] text-[#78756c] block">
                        Submitted by Nayandeep Goswami on {item.submittedAt}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="p-1.5 rounded-xl bg-[#f4f2eb] hover:bg-[#edeae2] text-[#78756c] transition-colors"
                      title={isExpanded ? 'Collapse' : 'Expand details'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4f4c46] leading-relaxed">
                    {item.message}
                  </p>

                  {/* Expandable Faculty Moderator Response */}
                  {isExpanded && item.response && (
                    <div className="p-3.5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs text-[#1a1918] space-y-1 animate-fade-in">
                      <div className="flex items-center gap-1.5 font-bold text-[#3e7b54]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Official Moderator Response</span>
                      </div>
                      <p className="text-[#4f4c46] leading-relaxed pl-5">
                        {item.response}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
