import React from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentProfile from './StudentProfile';
import FacultyProfile from './FacultyProfile';

const ProfileRouter: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  switch (currentUser.role) {
    case 'student':
      return <StudentProfile />;
    case 'faculty':
    case 'admin':
      return <FacultyProfile />;
    default:
      return <StudentProfile />;
  }
};

export default ProfileRouter;