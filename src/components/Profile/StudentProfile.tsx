import React, { useState, useEffect } from 'react';
import { Edit3, Save, X, Plus, Github, ExternalLink, Linkedin, FileText, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/baseurl';
import endPoints from '../../api/endPoints';
import uploadImages from '../../utils/imageUpload';
import { StudentProject } from '../../types';

const StudentProfile: React.FC = () => {
    const { currentUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(currentUser);
    // States for new features
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [customSkill, setCustomSkill] = useState('');
    
    
    const [showAddProject, setShowAddProject] = useState(false);
    const [newProject, setNewProject] = useState<{
        title: string;
        description: string;
        githubLink: string;
        demoLink: string;
        image: File | null;
    }>({
        title: '',
        description: '',
        githubLink: '',
        demoLink: '',
        image: null
    });
    const [userProjects, setUserProjects] = useState<StudentProject[]>([]);
    // console.log(userProjects, "userProjects");

    const availableSkills = [
        'React', 'Node.js', 'Python', 'Java', 'C++', 'JavaScript', 'TypeScript',
        'Machine Learning', 'Data Science', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL',
        'Express.js', 'Next.js', 'Vue.js', 'Angular', 'Spring Boot', 'Django',
        'Flask', 'TensorFlow', 'PyTorch', 'Kubernetes', 'Git', 'HTML/CSS'
    ];

    const allDisplaySkills = Array.from(new Set([...availableSkills, ...(editedUser?.skills || [])])).sort();


    useEffect(() => {
        if (!avatarFile) {
            setAvatarPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(avatarFile);
        setAvatarPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [avatarFile]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await apiClient({...endPoints.getStudentProjects});
            setUserProjects(response.data.data.map((p: StudentProject) => ({ ...p, id: p._id })));
            // console.log('Projects:', response.data.data);
        }
        fetchProjects();
    }, []);


    const handleSave = async () => {
        setIsEditing(false);
        // console.log('Updated user:', editedUser);
        if (avatarFile) {
            // console.log('Uploading new avatar:', avatarFile);
            const avatarUrl = await uploadImages(avatarFile);
            if (avatarUrl) {
                await apiClient({...endPoints.avatarUpload,data:{avatar:avatarUrl}});
            }
        }
        try {
          await apiClient({
            ...endPoints.studentProfile,data:{
                ...editedUser
            }
          });
          // console.log('User updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
        }
    };

    const handleSkillToggle = (skill: string) => {
        if (!editedUser) return;
        const currentSkills = editedUser.skills || [];
        const newSkills = currentSkills.includes(skill)
            ? currentSkills.filter(s => s !== skill)
            : [...currentSkills, skill];
        setEditedUser({ ...editedUser, skills: newSkills });
    };

    const handleAddCustomSkill = () => {
        const trimmedSkill = customSkill.trim();
        if (trimmedSkill && !editedUser?.skills?.includes(trimmedSkill)) {
            const newSkills = [...(editedUser?.skills || []), trimmedSkill];
            setEditedUser(prev => prev ? { ...prev, skills: newSkills } : null);
            setCustomSkill('');
        }
    };

    const handleAddProject = async () => {
      let imageUrl : unknown;
      if (newProject.image) {
        
        imageUrl = await uploadImages(newProject.image);
        if (imageUrl) {
          setNewProject(prev => ({ ...prev, imageUrl }));
        }
      }
      setShowAddProject(false);
      const response = await apiClient({
        ...endPoints.addStudentProject,
        data: { ...newProject, imageUrl }
      });
      setUserProjects(prev => [...prev, response.data.data]);
      setNewProject({ title: " ", description: '', githubLink: '', demoLink: '', image: null });
    };

    const handleDeleteProject = async (projectId: string) => {
      if (!window.confirm('Are you sure you want to delete this project?')) return;
      try {
        await apiClient({
          ...endPoints.deleteStudentProject,
          url: endPoints.deleteStudentProject.url + projectId,
        });
        setUserProjects(prev => prev.filter(p => p._id !== projectId));
      } catch {
        alert('Failed to delete project.');
      }
    };

    if (!currentUser) return null;
    

    const currentAvatar = avatarPreview || editedUser?.avatar || `https://ui-avatars.com/api/?name=${editedUser?.name}`;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow border border-gray-200">
                {/* Header */}
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                        <span>{isEditing ? 'Save' : 'Edit Profile'}</span>
                    </button>
                </div>
                
                <div className="p-6 space-y-8">
                    {/* AVATAR + BASIC INFO */}
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex-shrink-0 relative">
                            <img
                                src={currentAvatar}
                                alt="Avatar"
                                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                            />
                            {isEditing && (
                                <label
                                    htmlFor="avatar-upload"
                                    className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 text-white"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl font-bold text-gray-900">{editedUser?.name}</h2>
                            <p className="text-gray-600">{editedUser?.email}</p>
                            <p className="text-sm text-gray-500">{editedUser?.collegeName}</p>
                        </div>
                    </div>

                    <hr />

                    {/* LinkedIn, GitHub, Resume Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['linkedin', 'github', 'resume'].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field} Link</label>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        value={(editedUser && editedUser[field as 'linkedin' | 'github' | 'resume']) || ''}
                                        onChange={(e) => setEditedUser(prev => prev ? { ...prev, [field]: e.target.value } : null)}
                                        className="w-full px-3 py-2 border rounded-md focus:ring-blue-500"
                                        placeholder={`https://${field}.com/...`}
                                    />
                                ) : editedUser && editedUser[field as 'linkedin' | 'github' | 'resume'] ? (
                                    <a
                                        href={editedUser[field as 'linkedin' | 'github' | 'resume']}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                    >
                                        {field === 'linkedin' && <Linkedin className="w-4 h-4" />}
                                        {field === 'github' && <Github className="w-4 h-4" />}
                                        {field === 'resume' && <FileText className="w-4 h-4" />}
                                        <span>View</span>
                                    </a>
                                ) : (
                                    <span className="text-gray-400 italic">Not provided</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <hr />

                    {/* Academic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                            <input
                                type="text"
                                value={editedUser?.department || ''}
                                onChange={(e) => setEditedUser(prev => prev ? { ...prev, department: e.target.value } : null)}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border rounded-md disabled:bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                            <select
                                value={editedUser?.year || 1}
                                onChange={(e) => setEditedUser(prev => prev ? { ...prev, year: +e.target.value } : null)}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border rounded-md disabled:bg-gray-100"
                            >
                                {[1, 2, 3, 4].map(y => (
                                    <option key={y} value={y}>{`${y} Year`}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Info</label>
                            <input
                                type="text"
                                value={editedUser?.contactInfo || ''}
                                onChange={(e) => setEditedUser(prev => prev ? { ...prev, contactInfo: e.target.value } : null)}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border rounded-md disabled:bg-gray-100"
                            />
                        </div>
                    </div>

                    <hr />

                    {/* SKILLS */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {allDisplaySkills.map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => isEditing && handleSkillToggle(skill)}
                                    disabled={!isEditing}
                                    className={`px-3 py-1 rounded-full text-sm border ${
                                        editedUser?.skills?.includes(skill)
                                            ? 'bg-blue-100 text-blue-700 border-blue-300'
                                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                    } ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="mt-4 flex gap-2">
                                <input
                                    type="text"
                                    value={customSkill}
                                    onChange={(e) => setCustomSkill(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                                    className="flex-grow px-3 py-2 border rounded-md"
                                    placeholder="Add a new skill..."
                                />
                                <button
                                    onClick={handleAddCustomSkill}
                                    disabled={!customSkill.trim()}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300"
                                >
                                    Add
                                </button>
                            </div>
                        )}
                    </div>

                    <hr />

                    {/* INTERESTS */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Interests</h2>
                        <textarea
                            value={editedUser?.interests || ''}
                            onChange={(e) => setEditedUser(prev => prev ? { ...prev, interests: e.target.value } : null)}
                            disabled={!isEditing}
                            rows={3}
                            className="w-full px-3 py-2 border rounded-md disabled:bg-gray-100"
                            placeholder="Describe your interests and career goals..."
                        />
                    </div>

                    <hr />
                    
                    {/* PROJECTS */}

{userProjects.length === 0 ? (
  <div className="text-center py-12 text-gray-500">
    <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
    <h3 className="text-lg font-semibold">No Projects Yet</h3>
    <p className="text-sm mb-6">Start building your portfolio by adding projects</p>
    <button
      onClick={() => setShowAddProject(true)}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all duration-200 shadow"
    >
      <Plus className="h-4 w-4" />
      <span>Add Project</span>
    </button>
  </div>
) : (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Project Showcase</h2>
      <button
        onClick={() => setShowAddProject(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all duration-200 shadow"
      >
        <Plus className="h-4 w-4" />
        <span>Add Project</span>
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {userProjects.map((project,i) => (
        <div
          key={project.id+""+i}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col justify-between"
        >
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>
          </div>
          <div className="flex items-center gap-4 mt-auto">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-700 hover:text-black transition"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">Code</span>
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">Demo</span>
              </a>
            )}
            <button
              onClick={() => handleDeleteProject(project._id)}
              className="ml-auto text-red-500 hover:text-red-700 p-2 rounded-full"
              title="Delete Project"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

         
                </div>
            </div>

            {/* Add Project Modal */}
{showAddProject && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">Add New Project</h2>
        <button
          onClick={() => setShowAddProject(false)}
          className="text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Image Upload & Preview */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Project Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setNewProject(prev => ({ ...prev, image: file, }));
                }
              }}
              className="w-full text-sm text-gray-500 cursor-pointer"
            />
            <p className="mt-2 text-xs text-gray-400">Click to upload or drag image here</p>
            {newProject.image && (
              <img
                src={URL.createObjectURL(newProject.image)}
                alt="Preview"
                className="rounded-md w-full h-40 object-cover border"
              />
            )}
          </div>
        </div>

        {/* Right: Project Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., AI Chatbot with OpenAI"
            />
           
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short description of the project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
            <input
              type="url"
              value={newProject.githubLink}
              onChange={(e) => setNewProject(prev => ({ ...prev, githubLink: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/your-repo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Demo Link</label>
            <input
              type="url"
              value={newProject.demoLink}
              onChange={(e) => setNewProject(prev => ({ ...prev, demoLink: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://your-demo-site.com"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 bg-gray-50 px-6 py-4 border-t">
        <button
          onClick={() => setShowAddProject(false)}
          className="px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleAddProject}
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Add Project
        </button>
      </div>
    </div>
  </div>
)}



        </div>
    );
};

export default StudentProfile;