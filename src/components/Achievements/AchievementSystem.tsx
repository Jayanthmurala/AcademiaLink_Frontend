import React, { useState } from 'react';
import { Award, Star, Trophy, Target, TrendingUp, Calendar, Users, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'collaboration' | 'leadership' | 'innovation';
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  requirements: string[];
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  category: string;
  points: number;
  deadline: Date;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  participants: number;
}

const AchievementSystem: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'achievements' | 'challenges' | 'leaderboard'>('achievements');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const userStats = {
    totalPoints: 2450,
    level: 12,
    nextLevelPoints: 2800,
    rank: 23,
    totalUsers: 1247,
    achievementsUnlocked: 18,
    totalAchievements: 45,
    streakDays: 7
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your profile setup',
      icon: '🎯',
      category: 'learning',
      points: 50,
      rarity: 'common',
      isUnlocked: true,
      unlockedAt: new Date('2024-01-15'),
      progress: 1,
      maxProgress: 1,
      requirements: ['Complete profile information', 'Add skills', 'Upload profile picture']
    },
    {
      id: '2',
      title: 'Knowledge Seeker',
      description: 'Complete 5 learning modules',
      icon: '📚',
      category: 'learning',
      points: 200,
      rarity: 'common',
      isUnlocked: true,
      unlockedAt: new Date('2024-01-20'),
      progress: 5,
      maxProgress: 5,
      requirements: ['Complete 5 different learning modules']
    },
    {
      id: '3',
      title: 'Team Player',
      description: 'Join 3 project collaborations',
      icon: '🤝',
      category: 'collaboration',
      points: 300,
      rarity: 'rare',
      isUnlocked: true,
      unlockedAt: new Date('2024-02-01'),
      progress: 3,
      maxProgress: 3,
      requirements: ['Successfully join 3 different projects']
    },
    {
      id: '4',
      title: 'Skill Master',
      description: 'Master 10 different skills',
      icon: '⚡',
      category: 'learning',
      points: 500,
      rarity: 'epic',
      isUnlocked: false,
      progress: 7,
      maxProgress: 10,
      requirements: ['Complete skill assessments for 10 skills', 'Achieve 80%+ score in each']
    },
    {
      id: '5',
      title: 'Innovation Leader',
      description: 'Lead a successful project to completion',
      icon: '🚀',
      category: 'leadership',
      points: 750,
      rarity: 'legendary',
      isUnlocked: false,
      progress: 0,
      maxProgress: 1,
      requirements: ['Lead a project team', 'Complete project successfully', 'Receive positive feedback']
    },
    {
      id: '6',
      title: 'Network Builder',
      description: 'Connect with 25 peers and faculty',
      icon: '🌐',
      category: 'collaboration',
      points: 400,
      rarity: 'rare',
      isUnlocked: false,
      progress: 18,
      maxProgress: 25,
      requirements: ['Build connections across different departments', 'Maintain active communication']
    }
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Daily Learner',
      description: 'Complete one learning module today',
      type: 'daily',
      category: 'Learning',
      points: 25,
      deadline: new Date('2024-02-15'),
      progress: 0,
      maxProgress: 1,
      isCompleted: false,
      participants: 234
    },
    {
      id: '2',
      title: 'Weekly Collaborator',
      description: 'Participate in 3 project discussions this week',
      type: 'weekly',
      category: 'Collaboration',
      points: 100,
      deadline: new Date('2024-02-18'),
      progress: 1,
      maxProgress: 3,
      isCompleted: false,
      participants: 156
    },
    {
      id: '3',
      title: 'Monthly Innovator',
      description: 'Submit an innovative project idea',
      type: 'monthly',
      category: 'Innovation',
      points: 300,
      deadline: new Date('2024-02-29'),
      progress: 0,
      maxProgress: 1,
      isCompleted: false,
      participants: 89
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', points: 3450, level: 15, avatar: '👩‍💻' },
    { rank: 2, name: 'Rahul Kumar', points: 3200, level: 14, avatar: '👨‍💻' },
    { rank: 3, name: 'Anita Patel', points: 2980, level: 13, avatar: '👩‍🎓' },
    { rank: 4, name: 'Vikram Singh', points: 2750, level: 12, avatar: '👨‍🎓' },
    { rank: 5, name: 'Sneha Gupta', points: 2650, level: 12, avatar: '👩‍💼' },
  ];

  const categories = ['all', 'learning', 'collaboration', 'leadership', 'innovation'];

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-700';
      case 'rare': return 'text-blue-700';
      case 'epic': return 'text-purple-700';
      case 'legendary': return 'text-yellow-700';
      default: return 'text-gray-700';
    }
  };

  const getChallengeTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-emerald-100 text-emerald-800';
      case 'weekly': return 'bg-blue-100 text-blue-800';
      case 'monthly': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements & Challenges</h1>
        <p className="text-gray-600">Track your progress and compete with peers</p>
      </div>

      {/* User Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{userStats.totalPoints}</div>
            <div className="text-blue-100">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">Level {userStats.level}</div>
            <div className="text-blue-100">{userStats.nextLevelPoints - userStats.totalPoints} to next level</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">#{userStats.rank}</div>
            <div className="text-blue-100">Global Rank</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{userStats.achievementsUnlocked}/{userStats.totalAchievements}</div>
            <div className="text-blue-100">Achievements</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Level Progress</span>
            <span>{userStats.totalPoints}/{userStats.nextLevelPoints}</span>
          </div>
          <div className="w-full bg-blue-500 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${(userStats.totalPoints / userStats.nextLevelPoints) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'challenges', label: 'Challenges', icon: Target },
              { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'achievements' && (
            <>
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-lg border-2 transition-all ${getRarityColor(achievement.rarity)} ${
                      achievement.isUnlocked ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getRarityTextColor(achievement.rarity)}`}>
                          {achievement.points} pts
                        </div>
                        <div className={`text-xs font-medium ${getRarityTextColor(achievement.rarity)}`}>
                          {achievement.rarity.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>

                    {achievement.isUnlocked ? (
                      <div className="flex items-center text-emerald-600 text-sm font-medium">
                        <Award className="h-4 w-4 mr-1" />
                        <span>Unlocked {achievement.unlockedAt?.toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          <div className="font-medium mb-1">Requirements:</div>
                          <ul className="list-disc list-inside space-y-1">
                            {achievement.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              {challenges.map(challenge => (
                <div key={challenge.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{challenge.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChallengeTypeColor(challenge.type)}`}>
                          {challenge.type.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Ends {challenge.deadline.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{challenge.participants} participants</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{challenge.points}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{challenge.progress}/{challenge.maxProgress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          challenge.isCompleted ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {challenge.isCompleted ? (
                    <div className="flex items-center text-emerald-600 text-sm font-medium">
                      <Award className="h-4 w-4 mr-1" />
                      <span>Challenge Completed!</span>
                    </div>
                  ) : (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                      Join Challenge
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 mb-6 text-white">
                <h2 className="text-2xl font-bold mb-2">🏆 Top Performers</h2>
                <p className="text-yellow-100">See how you rank against your peers</p>
              </div>

              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      user.rank <= 3 
                        ? 'border-yellow-300 bg-yellow-50' 
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${
                        user.rank === 1 ? 'bg-yellow-500 text-white' :
                        user.rank === 2 ? 'bg-gray-400 text-white' :
                        user.rank === 3 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {user.rank <= 3 ? (
                          user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'
                        ) : (
                          user.rank
                        )}
                      </div>
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">Level {user.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{user.points}</div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                  </div>
                ))}

                {/* Current User Position */}
                <div className="border-t-2 border-blue-200 pt-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                        {userStats.rank}
                      </div>
                      <div className="text-2xl">👤</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{currentUser?.name} (You)</h3>
                        <p className="text-sm text-gray-600">Level {userStats.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementSystem;