import React, { useState, useEffect } from 'react';
import { Edit3, Save, Plus, X, FileText, ExternalLink, Linkedin, Github } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/baseurl';
import endPoints from '../../api/endPoints';
import uploadImages from '../../utils/imageUpload';
import { Publication, User } from '../../types';

const FacultyProfile: React.FC = () => {
  const { setCurrentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddPublication, setShowAddPublication] = useState(false);
  const [newPublication, setNewPublication] = useState({
    title: '',
    year: new Date().getFullYear(),
    fileUrl: ''
  });
    const [userPublications, setUserPublications] = useState<Publication[]>([]);
  const [customExpertise, setCustomExpertise] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient(endPoints.getProfile);
        setEditedUser(response.data);
        setCurrentUser(response.data); // Update auth context
        setAvatarPreview(response.data.avatar || null);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setCurrentUser]);

  const availableExpertise = [
    'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision',
    'Data Science', 'Artificial Intelligence', 'Software Engineering', 'Database Systems',
    'Cloud Computing', 'Cybersecurity', 'Mobile Development', 'Web Development',
    'IoT', 'Embedded Systems', 'Robotics', 'Blockchain', 'DevOps', 'System Design'
  ];

  useEffect(() => {
    const fetchPublications = async () => {
      if (editedUser?.publications && editedUser.publications.length > 0) {
        try {
          const response = await apiClient({
            ...endPoints.getPublicationsByIds,
            data: { ids: editedUser.publications },
          });
          setUserPublications(response.data as Publication[]);
        } catch (error) {
          console.error('Error fetching publications:', error);
        }
      }
    };

    if (editedUser) {
      fetchPublications();
    }
  }, [editedUser]);

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [avatarFile]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    if (!editedUser) return;
    let updatedUserData = { ...editedUser };

    if (avatarFile) {
      const avatarUrl = await uploadImages(avatarFile);
      if (avatarUrl) {
        updatedUserData.avatar = avatarUrl;
        // Also update the backend immediately for the avatar
        await apiClient({ ...endPoints.avatarUpload, data: { avatar: avatarUrl } });
      }
    }

    try {
      await apiClient({
        ...endPoints.facultyProfile,
        data: updatedUserData,
      });
    } catch (error) {
      console.error('Error updating faculty profile:', error);
    }
  };

  const handleAddPublication = async () => {
    try {
      const response = await apiClient({
        ...endPoints.addFacultyPublication,
        data: newPublication,
      });
      setUserPublications([...userPublications, response.data.publication]);
      setShowAddPublication(false);
      setNewPublication({ title: '', year: new Date().getFullYear(), fileUrl: '' });
    } catch (error) {
      console.error('Error adding publication:', error);
    }
  };

      const handleAddCustomExpertise = () => {
    const currentExpertise = editedUser?.areasOfExpertise || [];
    if (customExpertise && editedUser && !currentExpertise.includes(customExpertise)) {
      const newExpertise = [...currentExpertise, customExpertise];
      setEditedUser((prev: User | null) => prev ? { ...prev, areasOfExpertise: newExpertise } : null);
      setCustomExpertise('');
    }
  };

  const handleExpertiseToggle = (expertise: string) => {
    if (!editedUser) return;
        const currentExpertise = editedUser?.areasOfExpertise || [];
    const newExpertise = currentExpertise.includes(expertise)
      ? currentExpertise.filter(e => e !== expertise)
      : [...currentExpertise, expertise];
    setEditedUser((prev: User | null) => prev ? { ...prev, areasOfExpertise: newExpertise } : null);
  };

  const allExpertise = [...new Set([...availableExpertise, ...(editedUser?.areasOfExpertise || [])])];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev: User | null) => prev ? { ...prev, [name]: value } : null);
  };

  if (loading) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  if (!editedUser) {
    return <div className="text-center p-8">Could not load profile.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isEditing ? (
              <><Save className="h-4 w-4" /><span>Save</span></>
            ) : (
              <><Edit3 className="h-4 w-4" /><span>Edit Profile</span></>
            )}
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="md:flex md:items-start md:space-x-8">
            {/* Left Column: Avatar and Socials */}
            <div className="w-full md:w-1/3 text-center md:text-left">
              <div className="relative w-40 h-40 mx-auto md:mx-0 mb-4">
                <img
                  src={avatarPreview || editedUser?.avatar || 'https://via.placeholder.com/150'}
                  alt="Profile Avatar"
                  className="rounded-full w-full h-full object-cover border-4 border-gray-200 shadow-md"
                />
                {isEditing && (
                  <label htmlFor="avatar-upload" className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-300">
                    <Edit3 size={16} />
                    <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </label>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{editedUser?.name}</h2>
              <p className="text-md text-gray-500">{editedUser?.email}</p>
              <div className="flex justify-center md:justify-start space-x-4 mt-4">
                {editedUser?.linkedin && (
                  <a href={editedUser.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600"><Linkedin size={24} /></a>
                )}
                {editedUser?.github && (
                  <a href={editedUser.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800"><Github size={24} /></a>
                )}
              </div>
            </div>

            {/* Right Column: Profile Details */}
            <div className="w-full md:w-2/3 mt-8 md:mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" name="name" value={editedUser?.name || ''} disabled={!isEditing} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Info</label>
                  <input type="text" name="contactInfo" value={editedUser?.contactInfo || ''} disabled={!isEditing} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                  <input type="url" name="linkedin" value={editedUser?.linkedin || ''} disabled={!isEditing} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                  <input type="url" name="github" value={editedUser?.github || ''} disabled={!isEditing} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed" />
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Areas of Expertise</h3>
                  {isEditing ? (
                    <div className="flex flex-wrap gap-2">
                      {allExpertise.map((expertise: string) => (
                        <button key={expertise} onClick={() => handleExpertiseToggle(expertise)} className={`px-3 py-1 text-sm rounded-full transition-colors ${editedUser?.areasOfExpertise?.includes(expertise) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                          {expertise}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {editedUser && editedUser.areasOfExpertise && editedUser.areasOfExpertise.length > 0 ? (
                        editedUser.areasOfExpertise.map((expertise: string) => (
                          <span key={expertise} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">{expertise}</span>
                        ))
                      ) : (
                        <p className="text-gray-500">No expertise listed.</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="text"
                    value={customExpertise}
                    onChange={(e) => setCustomExpertise(e.target.value)}
                    placeholder="Add a new skill"
                    className="flex-grow px-3 py-2 border rounded-md bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={!isEditing}
                  />
                  <button
                    onClick={handleAddCustomExpertise}
                    disabled={!isEditing || !customExpertise}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Research Interests</h3>
                  <textarea name="researchInterests" value={editedUser?.researchInterests || ''} disabled={!isEditing} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border rounded-md bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed" placeholder="e.g., Artificial Intelligence, Quantum Computing" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Publications Section */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">My Publications</h3>
            <button onClick={() => setShowAddPublication(true)} className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Publication</span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userPublications.map((pub: Publication) => (
                <div key={pub._id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-start space-x-4">
                  <FileText className="h-8 w-8 text-blue-500 mt-1 flex-shrink-0" />
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800">{pub.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">{pub.year}</span>
                      {pub.link && (
                        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-blue-600 hover:underline">
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-sm">View PDF</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {userPublications.length === 0 && (
                <div className="text-center py-8 text-gray-500 col-span-2">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No publications added yet.</p>
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
              <button onClick={() => setShowAddPublication(false)} className="text-gray-500 hover:text-gray-700"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publication Title</label>
                <input type="text" value={newPublication.title} onChange={(e) => setNewPublication(prev => ({ ...prev, title: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter publication title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publication Year</label>
                <input type="number" value={newPublication.year} onChange={(e) => setNewPublication(prev => ({ ...prev, year: parseInt(e.target.value) }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" min="1900" max={new Date().getFullYear()} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PDF Link (optional)</label>
                <input type="url" value={newPublication.fileUrl} onChange={(e) => setNewPublication(prev => ({ ...prev, fileUrl: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://journal.com/paper.pdf" />
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex justify-end space-x-3">
                <button onClick={() => setShowAddPublication(false)} className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                <button onClick={handleAddPublication} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Add Publication</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyProfile;