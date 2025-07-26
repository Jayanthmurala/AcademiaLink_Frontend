import React from 'react';
import { BookOpen, Users, Target, TrendingUp, Calendar, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Active Projects',
      value: '2',
      icon: BookOpen,
      color: 'bg-blue-500',
      description: 'Currently participating in'
    },
    {
      title: 'Skill Progress',
      value: '75%',
      icon: TrendingUp,
      color: 'bg-emerald-500',
      description: 'Profile completion'
    },
    {
      title: 'Connections',
      value: '12',
      icon: Users,
      color: 'bg-purple-500',
      description: 'Faculty & peers'
    },
    {
      title: 'Achievements',
      value: '5',
      icon: Target,
      color: 'bg-orange-500',
      description: 'Completed milestones'
    }
  ];

  const recentActivities = [
    {
      title: 'Application Accepted',
      description: 'Your application for "Smart Campus IoT System" has been accepted!',
      time: '2 hours ago',
      type: 'success'
    },
    {
      title: 'New Learning Resource',
      description: 'React Advanced Patterns course added to your recommendations',
      time: '1 day ago',
      type: 'info'
    },
    {
      title: 'Project Milestone',
      description: 'Completed Phase 1 of AI Chatbot development',
      time: '3 days ago',
      type: 'achievement'
    }
  ];

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
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
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
            {recentActivities.map((activity, index) => (
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
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="font-medium text-red-900">Project Submission</h3>
            <p className="text-sm text-red-600 mt-1">AI Chatbot Phase 2</p>
            <p className="text-xs text-red-500 mt-1">Due in 3 days</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-medium text-yellow-900">Skill Assessment</h3>
            <p className="text-sm text-yellow-600 mt-1">React Advanced Patterns</p>
            <p className="text-xs text-yellow-500 mt-1">Due in 1 week</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900">Team Meeting</h3>
            <p className="text-sm text-blue-600 mt-1">IoT System Discussion</p>
            <p className="text-xs text-blue-500 mt-1">Tomorrow at 2:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;