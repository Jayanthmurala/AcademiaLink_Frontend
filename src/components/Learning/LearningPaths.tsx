import React, { useState, useEffect } from 'react';
import apiClient from '../../api/baseurl';

// Define a type for LearningResource
interface LearningResource {
  _id: string;
  title: string;
  url: string;
  description?: string;
  type?: string;
  skill?: string | { name: string };
  source?: string;
}

const LearningPaths: React.FC = () => {
  // const { currentUser } = useAuth();
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiClient.get('/api/v1/student/saved-learning-resources');
        setResources(res.data.resources || []);
      } catch {
        setError('Failed to load your saved resources.');
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Saved Learning Resources</h1>
        <p className="text-gray-600">All the resources you have saved for your learning journey.</p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : resources.length === 0 ? (
        <div className="text-center text-gray-500 py-16">No resources yet</div>
      ) : (
        <div className="space-y-6">
          {resources.map((resource) => (
            <div key={resource._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">{resource.title}</h3>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{resource.type}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">Go to Resource</a>
              {resource.skill && <div className="mt-2 text-xs text-gray-500">Skill: {typeof resource.skill === 'object' ? resource.skill.name : resource.skill}</div>}
              <div className="mt-2 text-xs text-gray-400">Source: {resource.source || 'Unknown'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPaths;