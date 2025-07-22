import React, { useState, useEffect } from 'react';
import { Target, BookOpen, CheckCircle, AlertCircle, Plus, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/baseurl';

interface CareerPath {
  name: string;
  requiredSkills: string[];
}

const SkillDevelopment: React.FC = () => {
  const { currentUser } = useAuth();
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>(currentUser?.skills || []);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [selectedCareerPath, setSelectedCareerPath] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const [learningResources, setLearningResources] = useState<Record<string, Array<{ title: string; url: string; description: string; type: string; _id?: string }>>>({});
  const [resourceLoading, setResourceLoading] = useState<Record<string, boolean>>({});
  const [resourceError, setResourceError] = useState<Record<string, string>>({});
  const [addSkillInput, setAddSkillInput] = useState('');
  const [addSkillError, setAddSkillError] = useState('');
  const [allSet, setAllSet] = useState(false);
  const [saveLoading, setSaveLoading] = useState<Record<string, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState<Record<string, boolean>>({});
  const [analyzeLoading, setAnalyzeLoading] = useState(false);

  useEffect(() => {
    fetchSkills();
    setUserSkills(currentUser?.skills || []);
    fetchCareerPaths();
  }, [currentUser]);

  const fetchSkills = async () => {
    try {
      const res = await apiClient.get('/api/skills');
      setAllSkills(res.data.map((s: { name: string }) => s.name));
    } catch {
      setAllSkills([]);
    }
  };

  const fetchCareerPaths = async () => {
    try {
      const res = await apiClient.get('/api/skills/career-paths');
      setCareerPaths(res.data);
    } catch {
      setCareerPaths([]);
    }
  };

  const fetchRequiredSkills = async (careerPathName: string) => {
    try {
      const res = await apiClient.get(`/api/skills/career-path-skills?name=${encodeURIComponent(careerPathName)}`);
      setRequiredSkills(res.data);
    } catch {
      setRequiredSkills([]);
    }
  };

  const handleCareerPathChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCareerPath(e.target.value);
    setShowAnalysis(false);
    setAllSet(false);
    setLearningResources({});
    setResourceError({});
    setResourceLoading({});
    setCompletedSkills([]);
    await fetchRequiredSkills(e.target.value);
  };

  const handleAddSkill = async () => {
    setAddSkillError('');
    if (!addSkillInput.trim() || !currentUser) return;
    if (userSkills.includes(addSkillInput.trim())) {
      setAddSkillError('Skill already added.');
      return;
    }
    try {
      await apiClient.post('/api/skills/user/add', { userId: currentUser._id, skillName: addSkillInput.trim() });
      setUserSkills([...userSkills, addSkillInput.trim()]);
      setAddSkillInput('');
    } catch {
      setAddSkillError('Failed to add skill.');
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    if (!currentUser) return;
    try {
      await apiClient.post('/api/skills/user/remove', { userId: currentUser._id, skillName: skill });
      setUserSkills(userSkills.filter(s => s !== skill));
    } catch {
      // Optionally show error
    }
  };

  const handleSaveResource = async (resourceId: string) => {
    setSaveLoading(prev => ({ ...prev, [resourceId]: true }));
    setSaveSuccess(prev => ({ ...prev, [resourceId]: false }));
    try {
      await apiClient.post('/student/save-learning-resource', { resourceId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSaveSuccess(prev => ({ ...prev, [resourceId]: true }));
    } catch {
      // Optionally show error
    } finally {
      setSaveLoading(prev => ({ ...prev, [resourceId]: false }));
    }
  };

  const handleAnalyzeSkills = async () => {
    setShowAnalysis(true);
    setAllSet(false);
    setAnalyzeLoading(true);
    if (!requiredSkills.length) {
      setAnalyzeLoading(false);
      return;
    }
    const missing = requiredSkills.filter(s => !userSkills.includes(s));
    if (missing.length === 0) {
      setAllSet(true);
      setLearningResources({});
      setAnalyzeLoading(false);
      return;
    }
    // Fetch resources for all missing skills
    const newResources: Record<string, Array<{ title: string; url: string; description: string; type: string; _id?: string }>> = {};
    const newLoading: Record<string, boolean> = {};
    const newError: Record<string, string> = {};
    await Promise.all(missing.map(async (skill) => {
      newLoading[skill] = true;
      try {
        const res = await apiClient.get(`/api/skills/resources?skill=${encodeURIComponent(skill)}`);
        newResources[skill] = res.data;
        newLoading[skill] = false;
      } catch {
        newResources[skill] = [];
        newError[skill] = 'Failed to fetch resources.';
        newLoading[skill] = false;
      }
    }));
    setLearningResources(newResources);
    setResourceLoading(newLoading);
    setResourceError(newError);
    setAnalyzeLoading(false);
  };

  const toggleSkillCompletion = (skill: string) => {
    setCompletedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const getSkillProgress = () => {
    const totalSkills = userSkills.length + (requiredSkills.length ? requiredSkills.filter(s => !userSkills.includes(s)).length : 0);
    const completedCount = userSkills.length + completedSkills.length;
    return totalSkills === 0 ? 0 : Math.round((completedCount / totalSkills) * 100);
  };

  if (!currentUser) {
    return <div className="text-center text-red-600">You must be logged in to view this page.</div>;
  }

  // Skill gap analysis: requiredSkills - userSkills
  const skillGaps = requiredSkills.filter(s => !userSkills.includes(s));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Development</h1>
        <p className="text-gray-600">Analyze your skills and get personalized learning recommendations</p>
      </div>

      {/* Add Skill */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={addSkillInput}
            onChange={e => setAddSkillInput(e.target.value)}
            placeholder="Add a new skill (e.g. React)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            list="all-skills"
          />
          <datalist id="all-skills">
            {allSkills.map(skill => <option key={skill} value={skill} />)}
          </datalist>
          <button
            onClick={handleAddSkill}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-1" /> Add
          </button>
        </div>
        {addSkillError && <div className="text-red-600 text-sm mb-2">{addSkillError}</div>}
        <div className="flex flex-wrap gap-2 mt-2">
          {userSkills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium flex items-center">
              {skill}
              <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
            </span>
          ))}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Your Progress</h2>
          <div className="text-2xl font-bold text-blue-600">{getSkillProgress()}%</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getSkillProgress()}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{userSkills.length}</div>
            <div className="text-sm text-emerald-700">Current Skills</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{skillGaps.length}</div>
            <div className="text-sm text-orange-700">Skill Gaps</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{Object.values(learningResources).flat().length}</div>
            <div className="text-sm text-blue-700">Resources Available</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Gap Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Target className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Skill Gap Analysis</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Career Path
              </label>
              <select
                value={selectedCareerPath}
                onChange={handleCareerPathChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your target role</option>
                {careerPaths.map(path => (
                  <option key={path.name} value={path.name}>{path.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAnalyzeSkills}
              disabled={!selectedCareerPath || analyzeLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {analyzeLoading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
              Analyze Skills
            </button>

            {showAnalysis && (
              <div className="mt-6 space-y-4">
                {allSet ? (
                  <div className="p-4 bg-emerald-50 rounded-lg text-emerald-800 font-semibold text-center">
                    <CheckCircle className="h-5 w-5 inline mr-2" />
                    You have all the required skills for this career path!
                    <div className="flex flex-wrap gap-2 mt-3 justify-center">
                      {requiredSkills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">{skill}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                        <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                        Skills to Develop
                      </h3>
                      <div className="space-y-2">
                        {skillGaps.map(skill => (
                          <div key={skill} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-orange-50 rounded-lg mb-2">
                            <div className="flex items-center">
                              <span className="text-orange-800 font-medium mr-2">{skill}</span>
                              <button
                                onClick={() => toggleSkillCompletion(skill)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                  completedSkills.includes(skill)
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {completedSkills.includes(skill) ? 'Completed' : 'Mark as Learning'}
                              </button>
                            </div>
                            <div className="mt-2 md:mt-0">
                              {resourceLoading[skill] && <span className="text-blue-600 text-xs">Loading resources...</span>}
                              {resourceError[skill] && <span className="text-red-600 text-xs">{resourceError[skill]}</span>}
                            </div>
                            <div className="mt-2 md:mt-0">
                              {learningResources[skill] && learningResources[skill].length > 0 && (
                                <ul className="list-disc ml-6">
                                  {learningResources[skill].map((resource, idx) => (
                                    <li key={idx} className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between">
                                      <div>
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">{resource.title}</a>
                                        <span className="ml-2 text-xs text-gray-600">({resource.type})</span>
                                        <div className="text-xs text-gray-500">{resource.description}</div>
                                      </div>
                                      {resource._id && (
                                        <button
                                          className="ml-4 mt-2 md:mt-0 bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 flex items-center text-xs min-w-[110px] justify-center"
                                          onClick={() => handleSaveResource(resource._id!)}
                                          disabled={saveLoading[resource._id] || saveSuccess[resource._id]}
                                        >
                                          {saveLoading[resource._id] ? <Loader2 className="animate-spin h-4 w-4 mr-1" /> : saveSuccess[resource._id] ? <CheckCircle className="h-4 w-4 mr-1" /> : null}
                                          {saveSuccess[resource._id] ? 'Saved' : 'Save Resource'}
                                        </button>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Learning Resources (summary) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Learning Resources</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(learningResources).map(([skill, resources]) => (
              <div key={skill} className="mb-4">
                <div className="font-semibold text-blue-800 mb-1">{skill}</div>
                {resources.length === 0 && <div className="text-gray-500 text-xs">No resources found.</div>}
                <ul className="list-disc ml-6">
                  {resources.map((resource, idx) => (
                    <li key={idx} className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">{resource.title}</a>
                        <span className="ml-2 text-xs text-gray-600">({resource.type})</span>
                        <div className="text-xs text-gray-500">{resource.description}</div>
                      </div>
                      {resource._id && (
                        <button
                          className="ml-4 mt-2 md:mt-0 bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 flex items-center text-xs min-w-[110px] justify-center"
                          onClick={() => handleSaveResource(resource._id!)}
                          disabled={saveLoading[resource._id] || saveSuccess[resource._id]}
                        >
                          {saveLoading[resource._id] ? <Loader2 className="animate-spin h-4 w-4 mr-1" /> : saveSuccess[resource._id] ? <CheckCircle className="h-4 w-4 mr-1" /> : null}
                          {saveSuccess[resource._id] ? 'Saved' : 'Save Resource'}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopment;