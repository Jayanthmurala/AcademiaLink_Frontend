import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import AuthScreen from './components/Auth/AuthScreen';
import UnauthorizedPage from './components/Pages/UnauthorizedPage';
import VerificationPendingPage from './components/Pages/VerificationPendingPage';

// Dashboard Components
import DashboardRouter from './components/Dashboard/DashboardRouter';
import ProfileRouter from './components/Profile/ProfileRouter';

// Student Components
import SkillDevelopment from './components/Skills/SkillDevelopment';
import LearningPaths from './components/Learning/LearningPaths';

// Project Components
import ProjectsBoardWrapper from './components/Projects/ProjectsBoardWrapper';
import ProjectDetailsWrapper from './components/Projects/ProjectDetailsWrapper';

// Faculty Components
import MyPosts from './components/Faculty/MyPosts';
import ProjectApplications from './components/Faculty/ProjectApplications';

// Admin Components
import UserVerification from './components/Admin/UserVerification';
import CollegeMetrics from './components/Admin/CollegeMetrics';

// Common Components
import MessagingInterface from './components/Messages/MessagingInterface';
import NetworkingHub from './components/Connections/NetworkingHub';
import EventsCalendar from './components/Events/EventsCalendar';
import AchievementSystem from './components/Achievements/AchievementSystem';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<AuthScreen />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/verification-pending" element={<VerificationPendingPage />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            {/* Default redirect */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* Common Routes */}
            <Route path="dashboard" element={<DashboardRouter />} />
            <Route path="profile" element={<ProfileRouter />} />
            <Route path="messages" element={<MessagingInterface />} />
            <Route path="networking" element={<NetworkingHub />} />
            <Route path="events" element={<EventsCalendar />} />
            <Route path="achievements" element={<AchievementSystem />} />
            
            {/* Project Routes */}
            <Route path="projects" element={<ProjectsBoardWrapper />} />
            <Route path="projects/:id" element={<ProjectDetailsWrapper />} />
            
            {/* Student Only Routes */}
            <Route path="skills" element={
              <ProtectedRoute allowedRoles={['student']}>
                <SkillDevelopment />
              </ProtectedRoute>
            } />
            <Route path="learning" element={
              <ProtectedRoute allowedRoles={['student']}>
                <LearningPaths />
              </ProtectedRoute>
            } />
            
            {/* Faculty Only Routes */}
            <Route path="my-posts" element={
              <ProtectedRoute allowedRoles={['faculty']}>
                <MyPosts />
              </ProtectedRoute>
            } />
            <Route path="applications" element={
              <ProtectedRoute allowedRoles={['faculty']}>
                <ProjectApplications />
              </ProtectedRoute>
            } />
            
            {/* Admin Only Routes */}
            <Route path="admin/verification" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserVerification />
              </ProtectedRoute>
            } />
            <Route path="admin/metrics" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CollegeMetrics />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;