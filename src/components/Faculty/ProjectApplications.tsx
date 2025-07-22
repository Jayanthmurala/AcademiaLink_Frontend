import React, { useState } from 'react';
import { User, Calendar, CheckCircle, XCircle, Eye, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockApplications, mockProjects } from '../../data/mockData';

const ProjectApplications: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');

  // Filter applications for current faculty's projects
  const facultyProjects = mockProjects.filter(p => p.facultyId === currentUser?.id);
  const facultyApplications = mockApplications.filter(app => 
    facultyProjects.some(project => project.id === app.projectId)
  );

  const filteredApplications = facultyApplications.filter(app => {
    const statusMatch = selectedStatus === 'all' || app.status === selectedStatus;
    const projectMatch = selectedProject === 'all' || app.projectId === selectedProject;
    return statusMatch && projectMatch;
  });

  const handleApplicationAction = (applicationId: string, action: 'accept' | 'reject') => {
    console.log(`${action} application:`, applicationId);
    // In a real app, this would update the application status
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectTitle = (projectId: string) => {
    const project = facultyProjects.find(p => p.id === projectId);
    return project?.title || 'Unknown Project';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Applications</h1>
        <p className="text-gray-600">Review and manage student applications for your projects</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending Review</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Project</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Projects</option>
              {facultyProjects.map(project => (
                <option key={project.id} value={project.id}>{project.title}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{filteredApplications.length}</span> applications found
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {filteredApplications.map((application) => (
          <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{application.studentName}</h3>
                  <p className="text-sm text-blue-600 mb-1">{getProjectTitle(application.projectId)}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Applied on {application.appliedAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                {application.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Why interested?</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{application.message}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Relevant Experience</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{application.relevantExperience}</p>
              </div>
            </div>

            {application.status === 'pending' && (
              <div className="flex space-x-3">
                <button
                  onClick={() => handleApplicationAction(application.id, 'accept')}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Accept</span>
                </button>
                <button
                  onClick={() => handleApplicationAction(application.id, 'reject')}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Reject</span>
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>View Profile</span>
                </button>
              </div>
            )}

            {application.status === 'accepted' && (
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Start Chat</span>
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>View Profile</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <User className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600">
            {selectedStatus === 'all' 
              ? "You haven't received any applications yet" 
              : `No ${selectedStatus} applications found`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectApplications;