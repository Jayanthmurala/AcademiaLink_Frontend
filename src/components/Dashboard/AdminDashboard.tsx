import React from 'react';
import { Users, Shield, BarChart3, TrendingUp, Calendar, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Pending Verifications',
      value: '5',
      icon: Shield,
      color: 'bg-orange-500',
      description: 'Require approval'
    },
    {
      title: 'Total Students',
      value: '1,247',
      icon: Users,
      color: 'bg-blue-500',
      description: 'Enrolled students'
    },
    {
      title: 'Total Faculty',
      value: '89',
      icon: Users,
      color: 'bg-emerald-500',
      description: 'Active faculty'
    },
    {
      title: 'Active Projects',
      value: '23',
      icon: TrendingUp,
      color: 'bg-purple-500',
      description: 'Ongoing research'
    }
  ];

  const recentActivities = [
    {
      title: 'New Registration',
      description: 'Priya Patel (Electronics) registered and pending verification',
      time: '2 hours ago',
      type: 'pending'
    },
    {
      title: 'Project Completion',
      description: 'Blockchain Certificate project marked as completed',
      time: '1 day ago',
      type: 'success'
    },
    {
      title: 'Faculty Added',
      description: 'Dr. Rajesh Gupta joined Computer Science department',
      time: '2 days ago',
      type: 'info'
    }
  ];

  const quickActions = [
    {
      title: 'User Verification',
      description: 'Review and approve pending registrations',
      action: () => navigate('/admin/verification'),
      icon: Shield,
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'College Metrics',
      description: 'View detailed analytics and reports',
      action: () => navigate('/admin/metrics'),
      icon: BarChart3,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Manage Users',
      description: 'View and manage all users in the system',
      action: () => navigate('/admin/users'),
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
          Manage your institution and oversee academic collaborations
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
                  activity.type === 'pending' ? 'bg-orange-500' :
                  'bg-gray-500'
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

      {/* Department Overview */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Department Statistics</h2>
          <BarChart3 className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900">Computer Science</h3>
            <p className="text-sm text-blue-600 mt-1">524 students • 28 faculty</p>
            <p className="text-xs text-blue-500 mt-1">12 active projects</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <h3 className="font-medium text-emerald-900">Electronics</h3>
            <p className="text-sm text-emerald-600 mt-1">398 students • 24 faculty</p>
            <p className="text-xs text-emerald-500 mt-1">8 active projects</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-medium text-purple-900">Mechanical</h3>
            <p className="text-sm text-purple-600 mt-1">325 students • 37 faculty</p>
            <p className="text-xs text-purple-500 mt-1">3 active projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;