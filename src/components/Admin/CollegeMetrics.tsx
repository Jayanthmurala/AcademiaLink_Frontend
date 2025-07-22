import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Award, Calendar } from 'lucide-react';

const CollegeMetrics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const metrics = {
    overview: {
      totalStudents: 1247,
      totalFaculty: 89,
      activeProjects: 23,
      completedProjects: 45,
      totalApplications: 156,
      successfulMatches: 78
    },
    departmentStats: [
      { name: 'Computer Science', students: 524, faculty: 28, projects: 12, completion: 85 },
      { name: 'Electronics', students: 398, faculty: 24, projects: 8, completion: 92 },
      { name: 'Mechanical', students: 325, faculty: 37, projects: 3, completion: 67 }
    ],
    monthlyTrends: [
      { month: 'Jan', projects: 8, applications: 45, matches: 12 },
      { month: 'Feb', projects: 12, applications: 67, matches: 18 },
      { month: 'Mar', projects: 15, applications: 89, matches: 25 },
      { month: 'Apr', projects: 18, applications: 102, matches: 32 },
      { month: 'May', projects: 23, applications: 156, matches: 45 }
    ],
    topSkills: [
      { skill: 'React', demand: 85, students: 124 },
      { skill: 'Python', demand: 92, students: 156 },
      { skill: 'Machine Learning', demand: 78, students: 89 },
      { skill: 'Node.js', demand: 65, students: 67 },
      { skill: 'IoT', demand: 72, students: 45 }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">College Metrics</h1>
        <p className="text-gray-600">Comprehensive analytics and performance insights</p>
      </div>

      {/* Time Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Time Period:</label>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-blue-600">{metrics.overview.totalStudents}</p>
              <p className="text-sm text-emerald-600 mt-1">↗ +12% from last month</p>
            </div>
            <Users className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-3xl font-bold text-emerald-600">{metrics.overview.activeProjects}</p>
              <p className="text-sm text-emerald-600 mt-1">↗ +28% from last month</p>
            </div>
            <BookOpen className="h-12 w-12 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-purple-600">
                {Math.round((metrics.overview.successfulMatches / metrics.overview.totalApplications) * 100)}%
              </p>
              <p className="text-sm text-emerald-600 mt-1">↗ +5% from last month</p>
            </div>
            <Award className="h-12 w-12 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Department Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Department Performance
          </h2>
          <div className="space-y-4">
            {metrics.departmentStats.map((dept) => (
              <div key={dept.name} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{dept.name}</h3>
                  <span className="text-sm font-medium text-emerald-600">{dept.completion}% completion</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">{dept.students}</span> students
                  </div>
                  <div>
                    <span className="font-medium">{dept.faculty}</span> faculty
                  </div>
                  <div>
                    <span className="font-medium">{dept.projects}</span> projects
                  </div>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${dept.completion}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Monthly Trends
          </h2>
          <div className="space-y-4">
            {metrics.monthlyTrends.map((month) => (
              <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900">{month.month}</div>
                <div className="flex space-x-6 text-sm">
                  <div className="text-blue-600">
                    <span className="font-medium">{month.projects}</span> projects
                  </div>
                  <div className="text-orange-600">
                    <span className="font-medium">{month.applications}</span> applications
                  </div>
                  <div className="text-emerald-600">
                    <span className="font-medium">{month.matches}</span> matches
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Skills in Demand */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Skills in Demand</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {metrics.topSkills.map((skill) => (
            <div key={skill.skill} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">{skill.skill}</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Demand</span>
                    <span className="font-medium">{skill.demand}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${skill.demand}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{skill.students}</span> students have this skill
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <span className="font-medium text-blue-900">New project posted:</span>
              <span className="text-blue-700"> "Advanced ML Algorithms" by Dr. Sharma</span>
            </div>
            <span className="text-sm text-blue-600">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
            <div>
              <span className="font-medium text-emerald-900">Project completed:</span>
              <span className="text-emerald-700"> "IoT Smart Campus" with 95% success rate</span>
            </div>
            <span className="text-sm text-emerald-600">1 day ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div>
              <span className="font-medium text-orange-900">High application volume:</span>
              <span className="text-orange-700"> "Blockchain Development" received 15 applications</span>
            </div>
            <span className="text-sm text-orange-600">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeMetrics;