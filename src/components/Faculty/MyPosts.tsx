import React, { useState } from 'react';
import { Plus, Edit3, Eye, Users, Calendar, MoreVertical, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockProjects } from '../../data/mockData';

const MyPosts: React.FC = () => {
  const { currentUser } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    requiredSkills: '',
    expectedOutcomes: '',
    duration: ''
  });

  const myProjects = mockProjects.filter(project => project.facultyId === currentUser?.id);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating project:', newProject);
    setShowCreateForm(false);
    setNewProject({
      title: '',
      description: '',
      requiredSkills: '',
      expectedOutcomes: '',
      duration: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-emerald-100 text-emerald-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApplicationCount = (projectId: string) => {
    // Mock application count
    return Math.floor(Math.random() * 10) + 1;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
          <p className="text-gray-600 mt-2">Manage your research project postings</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Post New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {myProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="relative">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
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
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{getApplicationCount(project.id)} applications</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{project.duration}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 text-sm">
                <Eye className="h-4 w-4" />
                <span>View Applications</span>
              </button>
              <button
                onClick={() => setEditingProject(project.id)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1 text-sm"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {myProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects posted yet</h3>
          <p className="text-gray-600 mb-4">Start by posting your first research project</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Post Your First Project
          </button>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Post New Research Project</h3>
              
              <form onSubmit={handleCreateProject} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject(prev => ({...prev, title: e.target.value}))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a compelling project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({...prev, description: e.target.value}))}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the project objectives, methodology, and scope..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills *
                  </label>
                  <input
                    type="text"
                    value={newProject.requiredSkills}
                    onChange={(e) => setNewProject(prev => ({...prev, requiredSkills: e.target.value}))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Python, Machine Learning, React (comma-separated)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Outcomes *
                  </label>
                  <textarea
                    value={newProject.expectedOutcomes}
                    onChange={(e) => setNewProject(prev => ({...prev, expectedOutcomes: e.target.value}))}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What will students achieve by the end of this project?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Duration *
                  </label>
                  <select
                    value={newProject.duration}
                    onChange={(e) => setNewProject(prev => ({...prev, duration: e.target.value}))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select duration</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="9 months">9 months</option>
                    <option value="12 months">12 months</option>
                  </select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Post Project
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;