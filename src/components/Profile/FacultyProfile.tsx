import React, { useState } from 'react';
import { Edit3, Save, Plus, X, FileText, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockPublications } from '../../data/mockData';

const FacultyProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser);
  const [showAddPublication, setShowAddPublication] = useState(false);
  const [newPublication, setNewPublication] = useState({
    title: '',
    year: new Date().getFullYear(),
    fileUrl: ''
  });

  const availableExpertise = [
    'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision',
    'Data Science', 'Artificial Intelligence', 'Software Engineering', 'Database Systems',
    'Cloud Computing', 'Cybersecurity', 'Mobile Development', 'Web Development',
    'IoT', 'Embedded Systems', 'Robotics', 'Blockchain', 'DevOps', 'System Design'
  ];

  const userPublications = mockPublications.filter(p => p.facultyId === currentUser?.id);

  const handleSave = () => {
    setIsEditing(false);
    console.log('Updated user:', editedUser);
  };

  const handleExpertiseToggle = (expertise: string) => {
    if (!editedUser) return;
    
    const currentExpertise = editedUser.areasOfExpertise || [];
    const newExpertise = currentExpertise.includes(expertise)
      ? currentExpertise.filter(e => e !== expertise)
      : [...currentExpertise, expertise];
    
    setEditedUser({
      ...editedUser,
      areasOfExpertise: newExpertise
    });
  };

  const handleAddPublication = () => {
    console.log('New publication:', newPublication);
    setShowAddPublication(false);
    setNewPublication({
      title: '',
      year: new Date().getFullYear(),
      fileUrl: ''
    });
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>

        <div className="p-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={editedUser?.name || ''}
                onChange={(e) => setEditedUser(prev => prev ? {...prev, name: e.target.value} : null)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={editedUser?.email || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
              <input
                type="text"
                value={editedUser?.collegeName || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                type="text"
                value={editedUser?.department || ''}
                onChange={(e) => setEditedUser(prev => prev ? {...prev, department: e.target.value} : null)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Research Interests */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Research Interests</h2>
            <textarea
              value={editedUser?.researchInterests || ''}
              onChange={(e) => setEditedUser(prev => prev ? {...prev, researchInterests: e.target.value} : null)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              rows={4}
              placeholder="Describe your research interests and current focus areas..."
            />
          </div>

          {/* Areas of Expertise */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {availableExpertise.map((expertise) => (
                <button
                  key={expertise}
                  onClick={() => isEditing && handleExpertiseToggle(expertise)}
                  disabled={!isEditing}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    editedUser?.areasOfExpertise?.includes(expertise)
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  } ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {expertise}
                </button>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Publications</h2>
              <button
                onClick={() => setShowAddPublication(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Publication</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {userPublications.map((publication) => (
                <div key={publication.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{publication.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">Published in {publication.year}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      {publication.fileUrl && (
                        <a
                          href={publication.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-sm">View PDF</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {userPublications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No publications added yet</p>
                  <p className="text-sm">Start building your research portfolio</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Publication Modal */}
      {showAddPublication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Publication</h3>
              <button
                onClick={() => setShowAddPublication(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publication Title</label>
                <input
                  type="text"
                  value={newPublication.title}
                  onChange={(e) => setNewPublication(prev => ({...prev, title: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter publication title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publication Year</label>
                <input
                  type="number"
                  value={newPublication.year}
                  onChange={(e) => setNewPublication(prev => ({...prev, year: parseInt(e.target.value)}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PDF Link (optional)</label>
                <input
                  type="url"
                  value={newPublication.fileUrl}
                  onChange={(e) => setNewPublication(prev => ({...prev, fileUrl: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://journal.com/paper.pdf"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddPublication}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Publication
                </button>
                <button
                  onClick={() => setShowAddPublication(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyProfile;