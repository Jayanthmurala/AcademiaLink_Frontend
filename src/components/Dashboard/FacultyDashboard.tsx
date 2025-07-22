import React from 'react';
import { Users, BookOpen, FileText, TrendingUp, Calendar, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Active Projects',
      value: '3',
      icon: BookOpen,
      color: 'bg-blue-500',
      description: 'Currently mentoring'
    },
    {
      title: 'Pending Applications',
      value: '8',
      icon: FileText,
      color: 'bg-orange-500',
      description: 'Require review'
    },
    {
      title: 'Student Connections',
      value: '24',
      icon: Users,
      color: 'bg-emerald-500',
      description: 'Active collaborations'
    },
    {
      title: 'Publications',
      value: '12',
      icon: TrendingUp,
      color: 'bg-purple-500',
      description: 'This academic year'
    }
  ];

  const recentActivities = [
    {
      title: 'New Application',
      description: 'Rahul Sharma applied for "AI-Powered Chatbot" project',
      time: '1 hour ago',
      type: 'info'
    },
    {
      title: 'Project Update',
      description: 'IoT System project reached 60% completion',
      time: '4 hours ago',
      type: 'success'
    },
    {
      title: 'Student Message',
      description: 'New message from Priya about embedded systems doubt',
      time: '1 day ago',
      type: 'message'
    }
  ];

  const quickActions = [
    {
      title: 'Post New Project',
      description: 'Share an exciting research opportunity',
      action: () => navigate('/my-posts'),
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Review Applications',
      description: 'Check pending student applications',
      action: () => navigate('/applications'),
      icon: FileText,
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'Update Profile',
      description: 'Add recent publications and achievements',
      action: () => navigate('/profile'),
      icon: Users,
      color: 'bg-emerald-50 text-emerald-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {currentUser?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your research projects and mentor the next generation
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
                  activity.type === 'message' ? 'bg-purple-500' :
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

      {/* Project Overview */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900">AI-Powered Chatbot</h3>
            <p className="text-sm text-blue-600 mt-1">3 students enrolled</p>
            <div className="mt-2 bg-blue-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <p className="text-xs text-blue-500 mt-1">40% complete</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <h3 className="font-medium text-emerald-900">Smart Campus IoT</h3>
            <p className="text-sm text-emerald-600 mt-1">2 students enrolled</p>
            <div className="mt-2 bg-emerald-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-emerald-500 mt-1">60% complete</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-medium text-purple-900">Blockchain Certificates</h3>
            <p className="text-sm text-purple-600 mt-1">1 student enrolled</p>
            <div className="mt-2 bg-purple-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <p className="text-xs text-purple-500 mt-1">80% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;