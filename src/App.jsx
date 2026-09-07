import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardView } from './views/DashboardView';
import { DsaTrackView } from './views/DsaTrackView';
import { LabsListView } from './views/LabsListView';
import { LabDetailView } from './views/LabDetailView';
import { AssessmentQuizView } from './views/AssessmentQuizView';
import { ProgrammingWorkspaceView } from './views/ProgrammingWorkspaceView';
import { DiagnosticResultView } from './views/DiagnosticResultView';
import { LeaderboardView } from './views/LeaderboardView';
import { StudentProfileView } from './views/StudentProfileView';
import { StudentTranscriptView } from './views/StudentTranscriptView';
import { StudentFeedbackView } from './views/StudentFeedbackView';
import { NotFoundView } from './views/NotFoundView';

export function App() {
  return (
    <Routes>
      {/* Root redirect to /student */}
      <Route path="/" element={<Navigate to="/student" replace />} />

      {/* Main Student Portal App Layout */}
      <Route element={<AppLayout />}>
        <Route path="/student" element={<DashboardView />} />
        <Route path="/student/dsa-track" element={<DsaTrackView />} />
        <Route path="/student/list" element={<LabsListView />} />
        <Route path="/student/detail/:id" element={<LabDetailView />} />
        <Route path="/student/quiz/:id" element={<AssessmentQuizView />} />
        <Route path="/student/workspace/:id" element={<ProgrammingWorkspaceView />} />
        <Route path="/student/result/:id" element={<DiagnosticResultView />} />
        <Route path="/student/leaderboard" element={<LeaderboardView />} />
        <Route path="/student/profile" element={<StudentProfileView />} />
        <Route path="/student/transcript" element={<StudentTranscriptView />} />
        <Route path="/student/feedback" element={<StudentFeedbackView />} />
        <Route path="*" element={<NotFoundView />} />
      </Route>
    </Routes>
  );
}

export default App;

