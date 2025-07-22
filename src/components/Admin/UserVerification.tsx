import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, User, Mail, Building, BookOpen } from 'lucide-react';
import { mockUsers } from '../../data/mockData';

const UserVerification: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('all');
  
  const pendingUsers = mockUsers.filter(user => !user.isVerified);
  const filteredUsers = pendingUsers.filter(user => 
    selectedRole === 'all' || user.role === selectedRole
  );

  const handleVerifyUser = (userId: string, action: 'verify' | 'reject') => {
    console.log(`${action} user:`, userId);
    // In a real app, this would update the user's verification status
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'faculty': return 'bg-emerald-100 text-emerald-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return BookOpen;
      case 'faculty': return User;
      case 'admin': return Shield;
      default: return User;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Verification</h1>
        <p className="text-gray-600">Review and approve pending user registrations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingUsers.length}</p>
            </div>
            <Shield className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Students</p>
              <p className="text-2xl font-bold text-blue-600">
                {pendingUsers.filter(u => u.role === 'student').length}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Faculty</p>
              <p className="text-2xl font-bold text-emerald-600">
                {pendingUsers.filter(u => u.role === 'faculty').length}
              </p>
            </div>
            <User className="h-8 w-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-purple-600">
                {pendingUsers.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admins</option>
          </select>
          <span className="text-sm text-gray-600">
            {filteredUsers.length} users pending verification
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => {
          const RoleIcon = getRoleIcon(user.role);
          return (
            <div key={user.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <RoleIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        <span>{user.collegeName}</span>
                      </div>
                      {user.role === 'student' && (
                        <>
                          <div>
                            <span className="font-medium">Branch:</span> {user.branch}
                          </div>
                          <div>
                            <span className="font-medium">Year:</span> {user.year}
                          </div>
                        </>
                      )}
                      {user.role === 'faculty' && (
                        <div>
                          <span className="font-medium">Department:</span> {user.department}
                        </div>
                      )}
                    </div>

                    {user.role === 'student' && user.skills && user.skills.length > 0 && (
                      <div className="mt-3">
                        <span className="text-sm font-medium text-gray-700">Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.skills.slice(0, 5).map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                          {user.skills.length > 5 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{user.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {user.role === 'faculty' && user.areasOfExpertise && user.areasOfExpertise.length > 0 && (
                      <div className="mt-3">
                        <span className="text-sm font-medium text-gray-700">Areas of Expertise:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.areasOfExpertise.slice(0, 5).map((area) => (
                            <span key={area} className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                              {area}
                            </span>
                          ))}
                          {user.areasOfExpertise.length > 5 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{user.areasOfExpertise.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleVerifyUser(user.id, 'verify')}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Verify</span>
                  </button>
                  <button
                    onClick={() => handleVerifyUser(user.id, 'reject')}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Shield className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pending verifications</h3>
          <p className="text-gray-600">
            {selectedRole === 'all' 
              ? "All users have been verified" 
              : `No pending ${selectedRole} verifications`}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserVerification;