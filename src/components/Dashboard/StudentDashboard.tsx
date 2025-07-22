import React, { useEffect, useState } from 'react';
import { BookOpen, Users, Target, TrendingUp, Calendar, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/baseurl';

// Define a type for Project
interface Project {
  _id: string;
  title: string;
  description?: string;
  status?: string;
  createdAt?: string;
  deadline?: string;
}

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);

  useEffect(() => {
    // Fetch student projects
    const fetchProjects = async () => {
      setProjectsLoading(true);
      try {
        const res = await apiClient.get('/api/v1/student/projects');
        setProjects(res.data.data || []);
      } catch {
        // setProjectsError('Failed to load projects'); // This line was removed as per the edit hint
      } finally {
        setProjectsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    // Fetch required skills for selected career path
    const fetchSkills = async () => {
      setSkillsLoading(true);
      try {
        const res = await apiClient.get('/api/v1/student/selected-career-path');
        const path = res.data.selectedCareerPath;
        setRequiredSkills(path?.requiredSkills || []);
      } catch {
        // setSkillsError('Failed to load skills'); // This line was removed as per the edit hint
      } finally {
        setSkillsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Calculate stats
  const activeProjects = projects.length;
  const userSkills = currentUser?.skills || [];
  const skillProgress = requiredSkills.length > 0 ? Math.round((userSkills.length / requiredSkills.length) * 100) : 0;
  const connections = (currentUser?.followers?.length || 0) + (currentUser?.following?.length || 0);
  // Proxy: Achievements = completed projects
  const achievements = projects.filter(p => p.status === 'completed').length;

  // Proxy: Recent activity (last 3 projects)
  const recentActivities = projects.slice(0, 3).map(p => ({
    title: p.title,
    description: p.description,
    time: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '',
    type: p.status === 'completed' ? 'achievement' : 'info'
  }));

  // Proxy: Upcoming deadlines (next 3 projects with a deadline field)
  const upcomingDeadlines = projects.filter(p => p.deadline).slice(0, 3);

  const quickActions = [
    {
      title: 'Browse Projects',
      description: 'Find exciting research and development opportunities',
      action: () => navigate('/projects'),
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Skill Analysis',
      description: 'Identify gaps and get personalized recommendations',
      action: () => navigate('/skills'),
      icon: Target,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Update Profile',
      description: 'Keep your skills and projects up to date',
      action: () => navigate('/profile'),
      icon: Users,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {currentUser?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening in your academic journey
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Projects */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              {projectsLoading ? (
                <p className="text-2xl font-bold text-gray-900 mt-1 animate-pulse">...</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900 mt-1">{activeProjects}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Currently participating in</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        {/* Skill Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Skill Progress</p>
              {skillsLoading ? (
                <p className="text-2xl font-bold text-gray-900 mt-1 animate-pulse">...</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900 mt-1">{skillProgress}%</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Profile completion</p>
            </div>
            <div className="bg-emerald-500 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        {/* Connections */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Connections</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{connections}</p>
              <p className="text-xs text-gray-500 mt-1">Faculty & peers</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{achievements}</p>
              <p className="text-xs text-gray-500 mt-1">Completed milestones</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="w-full flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className={`${action.color} p-3 rounded-lg mr-4`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <Bell className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {projectsLoading ? (
              <div className="text-gray-400">Loading...</div>
            ) : recentActivities.length === 0 ? (
              <div className="text-gray-400">No recent activity</div>
            ) : recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-emerald-500' :
                  activity.type === 'info' ? 'bg-blue-500' :
                  'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Deadlines</h2>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectsLoading ? (
            <div className="text-gray-400">Loading...</div>
          ) : upcomingDeadlines.length === 0 ? (
            <div className="text-gray-400">No upcoming deadlines</div>
          ) : upcomingDeadlines.map((deadline, idx) => (
            <div key={idx} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900">{deadline.title}</h3>
              <p className="text-sm text-blue-600 mt-1">{deadline.description}</p>
              <p className="text-xs text-blue-500 mt-1">Due: {deadline.deadline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;