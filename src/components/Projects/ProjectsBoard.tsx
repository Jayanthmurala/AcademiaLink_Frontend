import React, { useState } from 'react';
import { Search, Filter, Clock, Users, MapPin, ExternalLink } from 'lucide-react';
import { mockProjects } from '../../data/mockData';
import { Project } from '../../types';

interface ProjectsBoardProps {
  onViewProject: (project: Project) => void;
}

const ProjectsBoard: React.FC<ProjectsBoardProps> = ({ onViewProject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil'];
  const statuses = ['open', 'in-progress', 'completed'];

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.facultyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || project.department === selectedDepartment;
    const matchesStatus = !selectedStatus || project.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-emerald-100 text-emerald-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return '🟢';
      case 'in-progress': return '🔵';
      case 'completed': return '⚪';
      default: return '⚪';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Projects</h1>
        <p className="text-gray-600">Discover exciting research opportunities and collaborate with faculty</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, faculty, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{project.facultyName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{project.department}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)} {project.status.replace('-', ' ')}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Required Skills:</h4>
              <div className="flex flex-wrap gap-1">
                {project.requiredSkills.slice(0, 3).map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
                {project.requiredSkills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{project.requiredSkills.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{project.duration}</span>
              </div>
            </div>

            <button
              onClick={() => onViewProject(project)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>View Details</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsBoard;