import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import { mockProjects } from '../../data/mockData';
import { Project } from '../../types';

const ProjectDetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      const foundProject = mockProjects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
      } else {
        navigate('/projects');
      }
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ProjectDetails 
      project={project} 
      onBack={() => navigate('/projects')} 
    />
  );
};

export default ProjectDetailsWrapper;