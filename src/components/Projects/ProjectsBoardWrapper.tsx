import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectsBoard from './ProjectsBoard';
import { Project } from '../../types';

const ProjectsBoardWrapper: React.FC = () => {
  const navigate = useNavigate();

  const handleViewProject = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  return <ProjectsBoard onViewProject={handleViewProject} />;
};

export default ProjectsBoardWrapper;