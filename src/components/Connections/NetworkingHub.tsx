import React, { useState } from 'react';
import { Search, Users, UserPlus, MessageCircle, Filter, MapPin, BookOpen, Award, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockUsers } from '../../data/mockData';

const NetworkingHub: React.FC = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [activeTab, setActiveTab] = useState('discover');
  const [connections, setConnections] = useState<string[]>(['faculty1']); // Mock existing connections

  // Filter out current user and get potential connections
  const allUsers = mockUsers.filter(user => user.id !== currentUser?.id);
  
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (user.branch && user.branch.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesDepartment = !selectedDepartment || 
                             user.department === selectedDepartment || 
                             user.branch === selectedDepartment;
    const matchesSkill = !selectedSkill || 
                        (user.skills && user.skills.includes(selectedSkill)) ||
                        (user.areasOfExpertise && user.areasOfExpertise.includes(selectedSkill));
    
    return matchesSearch && matchesRole && matchesDepartment && matchesSkill;
  });

  const connectedUsers = allUsers.filter(user => connections.includes(user.id));
  const suggestedUsers = allUsers.filter(user => {
    if (connections.includes(user.id)) return false;
    
    // Suggest based on similar skills, same college, or complementary roles
    const hasCommonSkills = currentUser?.skills?.some(skill => 
      user.skills?.includes(skill) || user.areasOfExpertise?.includes(skill)
    );
    const sameCollege = user.collegeId === currentUser?.collegeId;
    const complementaryRole = (currentUser?.role === 'student' && user.role === 'faculty') ||
                             (currentUser?.role === 'faculty' && user.role === 'student');
    
    return sameCollege && (hasCommonSkills || complementaryRole);
  }).slice(0, 6);

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil'];
  const allSkills = [
    'React', 'Python', 'Machine Learning', 'IoT', 'Java', 'Node.js', 
    'Data Science', 'AI', 'Blockchain', 'Mobile Development'
  ];

  const handleConnect = (userId: string) => {
    setConnections(prev => [...prev, userId]);
    console.log('Connection request sent to:', userId);
  };

  const handleMessage = (userId: string) => {
    console.log('Starting conversation with:', userId);
    // In a real app, this would navigate to messages with this user
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
      case 'faculty': return Award;
      case 'admin': return Users;
      default: return Users;
    }
  };

  const UserCard: React.FC<{ user: any; showConnectButton?: boolean }> = ({ user, showConnectButton = true }) => {
    const RoleIcon = getRoleIcon(user.role);
    const isConnected = connections.includes(user.id);

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <RoleIcon className="h-6 w-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)} mb-2`}>
                {user.role.toUpperCase()}
              </span>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{user.collegeName}</span>
              </div>
              {user.department && (
                <p className="text-sm text-gray-600">{user.department}</p>
              )}
              {user.branch && (
                <p className="text-sm text-gray-600">{user.branch} - Year {user.year}</p>
              )}
            </div>
          </div>
          {isConnected && (
            <div className="flex items-center text-emerald-600">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Connected</span>
            </div>
          )}
        </div>

        {/* Skills/Expertise */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            {user.role === 'faculty' ? 'Areas of Expertise' : 'Skills'}
          </h4>
          <div className="flex flex-wrap gap-1">
            {(user.areasOfExpertise || user.skills || []).slice(0, 4).map((skill: string) => (
              <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {skill}
              </span>
            ))}
            {(user.areasOfExpertise || user.skills || []).length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{(user.areasOfExpertise || user.skills || []).length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Research Interests or Interests */}
        {(user.researchInterests || user.interests) && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              {user.role === 'faculty' ? 'Research Interests' : 'Interests'}
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {user.researchInterests || user.interests}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {showConnectButton && !isConnected && (
            <button
              onClick={() => handleConnect(user.id)}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 text-sm"
            >
              <UserPlus className="h-4 w-4" />
              <span>Connect</span>
            </button>
          )}
          <button
            onClick={() => handleMessage(user.id)}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1 text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Message</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Networking Hub</h1>
        <p className="text-gray-600">Connect with peers, faculty, and build your professional network</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Your Connections</p>
              <p className="text-2xl font-bold text-blue-600">{connections.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Suggested Connections</p>
              <p className="text-2xl font-bold text-emerald-600">{suggestedUsers.length}</p>
            </div>
            <Star className="h-8 w-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Network Reach</p>
              <p className="text-2xl font-bold text-purple-600">{allUsers.length}</p>
            </div>
            <Filter className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'discover', label: 'Discover People', count: filteredUsers.length },
              { id: 'suggestions', label: 'Suggestions', count: suggestedUsers.length },
              { id: 'connections', label: 'My Connections', count: connections.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filters */}
        {activeTab === 'discover' && (
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, department, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="student">Students</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
              <div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Skills</option>
                  {allSkills.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'discover' && filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {activeTab === 'suggestions' && suggestedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {activeTab === 'connections' && connectedUsers.map((user) => (
          <UserCard key={user.id} user={user} showConnectButton={false} />
        ))}
      </div>

      {/* Empty States */}
      {activeTab === 'discover' && filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {activeTab === 'suggestions' && suggestedUsers.length === 0 && (
        <div className="text-center py-12">
          <Star className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions available</h3>
          <p className="text-gray-600">Complete your profile to get better connection suggestions</p>
        </div>
      )}

      {activeTab === 'connections' && connections.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No connections yet</h3>
          <p className="text-gray-600">Start building your network by connecting with peers and faculty</p>
        </div>
      )}
    </div>
  );
};

export default NetworkingHub;