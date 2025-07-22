import React, { useState } from 'react';
import { ArrowLeft, User, MapPin, Clock, Target, CheckCircle, Send } from 'lucide-react';
import { Project } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack }) => {
  const { currentUser } = useAuth();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    message: '',
    relevantExperience: ''
  });

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', applicationData);
    setShowApplicationForm(false);
    setApplicationData({ message: '', relevantExperience: '' });
    // Show success message
    alert('Application submitted successfully!');
  };

  const canApply = currentUser?.role === 'student' && project.status === 'open';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Projects</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{project.facultyName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{project.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{project.duration}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'open' ? 'bg-emerald-100 text-emerald-800' :
                project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {project.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Project Description</h2>
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </div>

          {/* Required Skills */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {project.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Expected Outcomes */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Expected Outcomes
            </h2>
            <p className="text-gray-700 leading-relaxed">{project.expectedOutcomes}</p>
          </div>

          {/* Action Buttons */}
          {canApply && (
            <div className="border-t border-gray-200 pt-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Apply for Project</span>
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors">
                  Contact Faculty
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Apply for Project</h3>
              
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why are you interested in this project?
                  </label>
                  <textarea
                    value={applicationData.message}
                    onChange={(e) => setApplicationData(prev => ({...prev, message: e.target.value}))}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Explain your motivation and what you hope to learn..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relevant Skills & Experience
                  </label>
                  <textarea
                    value={applicationData.relevantExperience}
                    onChange={(e) => setApplicationData(prev => ({...prev, relevantExperience: e.target.value}))}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your relevant skills, projects, and experience..."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
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

export default ProjectDetails;