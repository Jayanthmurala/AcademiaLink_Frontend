import React from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardRouter: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  switch (currentUser.role) {
    case 'student':
      return <StudentDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
};

export default DashboardRouter;