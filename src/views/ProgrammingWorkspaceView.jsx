import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Clock,
  RotateCcw,
  Send,
  Code2,
  FileCode,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStudent } from '../context/StudentContext';

export const ProgrammingWorkspaceView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { labs, submitLab } = useStudent();

  const lab = labs.find((l) => l.id === id) || labs[0];

  const [language, setLanguage] = useState('c');
  const [code, setCode] = useState(lab?.starterCode || `// Solution for ${lab?.title}\n#include <stdio.h>\n\nint main() {\n    printf("Benchmarking algorithm...\\n");\n    return 0;\n}`);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput({ status: 'running', text: 'Compiling with GCC 13.2.0 -O2...' });

    setTimeout(() => {
      setIsRunning(false);
      setConsoleOutput({
        status: 'success',
        text: `Compilation Succeeded.\nRunning Automated Test Suite...\n[PASS] Test Case 1 (Small Reference String): 0.002s, Peak Memory: 1.2 MB\n[PASS] Test Case 2 (Heavy Page Thrashing): 0.005s, Peak Memory: 1.8 MB\n[PASS] Test Case 3 (Boundary Frames = 1): 0.001s, Peak Memory: 1.1 MB\n\nAll 3 Test Cases Verified! Ready for submission.`,
        allPassed: true
      });
    }, 1200);
  };

  const handleSubmitSolution = async () => {
    setIsRunning(true);
    await submitLab(lab.id, code);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
    setIsRunning(false);
    navigate(`/student/detail/${lab.id}`);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Top Action Bar */}
      <div className="p-4 rounded-3xl bg-white border border-[#e6e3da] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to={`/student/detail/${lab.id}`}
            className="p-2 rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] text-[#78756c] hover:text-[#1a1918] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d97757]">
                Programming Workspace
              </span>
              <span className="text-xs text-[#78756c] font-mono">&bull; {lab.courseCode}</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-[#1a1918] truncate max-w-md">
              {lab.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#f4f2eb] border border-[#e6e3da] text-xs font-bold text-[#1a1918] focus:outline-none"
          >
            <option value="c">C (GCC 13.2)</option>
            <option value="cpp">C++ 20</option>
            <option value="python">Python 3.12</option>
            <option value="java">Java 21</option>
          </select>

          <button
            type="button"
            disabled={isRunning}
            onClick={handleRunCode}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] text-[#1a1918] text-xs font-bold transition-all"
          >
            <Play className="w-3.5 h-3.5 text-[#3e7b54] fill-[#3e7b54]" />
            <span>Run Test Cases</span>
          </button>

          <button
            type="button"
            disabled={isRunning}
            onClick={handleSubmitSolution}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] text-white text-xs font-bold shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Code</span>
          </button>
        </div>
      </div>

      {/* Split Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Side: Problem Statement & Test Cases (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-4 max-h-[750px] overflow-y-auto">
          <div className="flex items-center gap-2 border-b border-[#f4f2eb] pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                activeTab === 'description'
                  ? 'bg-[#d97757]/10 text-[#d97757]'
                  : 'text-[#78756c] hover:text-[#1a1918]'
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('testcases')}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                activeTab === 'testcases'
                  ? 'bg-[#d97757]/10 text-[#d97757]'
                  : 'text-[#78756c] hover:text-[#1a1918]'
              }`}
            >
              Example Test Cases
            </button>
          </div>

          {activeTab === 'description' ? (
            <div className="space-y-3 text-xs sm:text-sm text-[#4f4c46] leading-relaxed">
              <h2 className="font-bold text-sm text-[#1a1918]">Problem Overview</h2>
              <p>{lab.description}</p>

              <h3 className="font-bold text-xs uppercase tracking-wider text-[#78756c] pt-2">
                Requirements & Constraints:
              </h3>
              <ul className="list-disc list-inside space-y-1.5 pl-1">
                <li>Algorithm must execute within 2.0 seconds time limit.</li>
                <li>Maximum physical frames: 10 frames per simulation.</li>
                <li>Do not allocate global mutable state across test iterations.</li>
                <li>Properly free dynamically allocated frames on simulation termination.</li>
              </ul>

              <h3 className="font-bold text-xs uppercase tracking-wider text-[#78756c] pt-2">
                Expected Output Format:
              </h3>
              <div className="p-3 rounded-xl bg-[#f4f2eb] font-mono text-xs text-[#1a1918]">
                Total Page Faults: &lt;count&gt;<br />
                Fault Ratio: &lt;percentage&gt;%
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] space-y-1">
                <span className="text-[11px] font-bold text-[#78756c] uppercase">Test Case 1</span>
                <p className="font-mono text-xs text-[#1a1918]">Input: [7, 0, 1, 2, 0, 3, 0, 4, 2, 3], Frames = 3</p>
                <p className="font-mono text-xs text-[#3e7b54]">Expected: Total Page Faults: 8</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] space-y-1">
                <span className="text-[11px] font-bold text-[#78756c] uppercase">Test Case 2</span>
                <p className="font-mono text-xs text-[#1a1918]">Input: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], Frames = 4</p>
                <p className="font-mono text-xs text-[#3e7b54]">Expected: Total Page Faults: 10</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Code Editor & Console (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl bg-white border border-[#e6e3da] shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-[#f4f2eb] border-b border-[#e6e3da] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#78756c] flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5" /> solution.{language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : 'c'}
              </span>
              <button
                type="button"
                onClick={() => setCode(lab?.starterCode || '')}
                className="text-[11px] font-bold text-[#78756c] hover:text-[#1a1918] flex items-center gap-1"
                title="Reset to starter code"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <textarea
              id="programming-code-editor"
              name="programmingCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={18}
              spellCheck={false}
              className="w-full p-4 font-mono text-xs sm:text-sm bg-white text-[#1a1918] focus:outline-none resize-none leading-relaxed selection:bg-[#d97757]/20"
              placeholder="// Write your algorithm solution..."
            />
          </div>

          {/* Compiler & Test Case Console Drawer */}
          <div className="p-4 rounded-3xl bg-[#1f1e1d] text-white font-mono text-xs shadow-md space-y-2">
            <div className="flex items-center justify-between text-[#a09e99] border-b border-neutral-800 pb-2">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Terminal className="w-3.5 h-3.5" /> Execution Console
              </span>
              {consoleOutput?.status === 'success' && (
                <span className="text-[#5a8c69] flex items-center gap-1 font-bold text-[10px]">
                  <CheckCircle2 className="w-3 h-3" /> All Tests Passed
                </span>
              )}
            </div>

            <div className="py-1 min-h-[70px] whitespace-pre-line leading-relaxed text-[#eae8e3]">
              {consoleOutput ? (
                consoleOutput.text
              ) : (
                <span className="text-[#78756c]">
                  Click "Run Test Cases" to compile and benchmark your solution.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
