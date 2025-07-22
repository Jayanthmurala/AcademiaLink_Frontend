import React, { useState } from 'react';
import { BookOpen, Clock, Award, Play, CheckCircle, Lock, Star, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  isCompleted: boolean;
  isLocked: boolean;
  instructor: string;
  rating: number;
  enrolledCount: number;
  skills: string[];
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  totalCourses: number;
  completedCourses: number;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  courses: Course[];
  prerequisites: string[];
}

const LearningPaths: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const learningPaths: LearningPath[] = [
    {
      id: 'fullstack-web',
      title: 'Full Stack Web Development',
      description: 'Master modern web development from frontend to backend with React, Node.js, and databases.',
      category: 'Web Development',
      totalCourses: 8,
      completedCourses: 3,
      estimatedTime: '12 weeks',
      difficulty: 'Intermediate',
      prerequisites: ['Basic JavaScript', 'HTML/CSS'],
      courses: [
        {
          id: 'react-basics',
          title: 'React Fundamentals',
          description: 'Learn the core concepts of React including components, state, and props.',
          duration: '2 weeks',
          difficulty: 'Beginner',
          progress: 100,
          isCompleted: true,
          isLocked: false,
          instructor: 'Dr. Sarah Johnson',
          rating: 4.8,
          enrolledCount: 1247,
          skills: ['React', 'JavaScript', 'JSX']
        },
        {
          id: 'react-advanced',
          title: 'Advanced React Patterns',
          description: 'Master hooks, context, performance optimization, and advanced patterns.',
          duration: '2 weeks',
          difficulty: 'Intermediate',
          progress: 65,
          isCompleted: false,
          isLocked: false,
          instructor: 'Prof. Mike Chen',
          rating: 4.9,
          enrolledCount: 892,
          skills: ['React Hooks', 'Context API', 'Performance']
        },
        {
          id: 'nodejs-backend',
          title: 'Node.js Backend Development',
          description: 'Build scalable backend applications with Node.js and Express.',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          progress: 30,
          isCompleted: false,
          isLocked: false,
          instructor: 'Dr. Alex Kumar',
          rating: 4.7,
          enrolledCount: 756,
          skills: ['Node.js', 'Express', 'APIs']
        },
        {
          id: 'database-design',
          title: 'Database Design & Management',
          description: 'Learn SQL, NoSQL databases, and data modeling best practices.',
          duration: '2 weeks',
          difficulty: 'Intermediate',
          progress: 0,
          isCompleted: false,
          isLocked: true,
          instructor: 'Prof. Lisa Wang',
          rating: 4.6,
          enrolledCount: 634,
          skills: ['SQL', 'MongoDB', 'Database Design']
        }
      ]
    },
    {
      id: 'data-science',
      title: 'Data Science & Machine Learning',
      description: 'Complete journey from data analysis to machine learning model deployment.',
      category: 'Data Science',
      totalCourses: 6,
      completedCourses: 1,
      estimatedTime: '16 weeks',
      difficulty: 'Advanced',
      prerequisites: ['Python Programming', 'Statistics Basics'],
      courses: [
        {
          id: 'python-data',
          title: 'Python for Data Science',
          description: 'Master pandas, numpy, and matplotlib for data manipulation and visualization.',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          progress: 100,
          isCompleted: true,
          isLocked: false,
          instructor: 'Dr. Priya Sharma',
          rating: 4.9,
          enrolledCount: 2156,
          skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib']
        },
        {
          id: 'ml-fundamentals',
          title: 'Machine Learning Fundamentals',
          description: 'Learn supervised and unsupervised learning algorithms.',
          duration: '4 weeks',
          difficulty: 'Advanced',
          progress: 0,
          isCompleted: false,
          isLocked: false,
          instructor: 'Prof. Raj Patel',
          rating: 4.8,
          enrolledCount: 1834,
          skills: ['Machine Learning', 'Scikit-learn', 'Algorithms']
        }
      ]
    },
    {
      id: 'mobile-dev',
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile applications with React Native and Flutter.',
      category: 'Mobile Development',
      totalCourses: 5,
      completedCourses: 0,
      estimatedTime: '10 weeks',
      difficulty: 'Intermediate',
      prerequisites: ['JavaScript Basics', 'React Fundamentals'],
      courses: [
        {
          id: 'react-native',
          title: 'React Native Development',
          description: 'Build native mobile apps using React Native framework.',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          progress: 0,
          isCompleted: false,
          isLocked: false,
          instructor: 'Dr. Amit Singh',
          rating: 4.7,
          enrolledCount: 987,
          skills: ['React Native', 'Mobile Development', 'JavaScript']
        }
      ]
    }
  ];

  const categories = ['all', 'Web Development', 'Data Science', 'Mobile Development', 'DevOps', 'Cybersecurity'];

  const filteredPaths = learningPaths.filter(path => 
    selectedCategory === 'all' || path.category === selectedCategory
  );

  const selectedPathData = learningPaths.find(path => path.id === selectedPath);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-emerald-500';
    if (progress > 50) return 'bg-blue-500';
    if (progress > 0) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Paths</h1>
        <p className="text-gray-600">Structured learning journeys to master in-demand skills</p>
      </div>

      {!selectedPath ? (
        <>
          {/* Category Filter */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-wrap gap-2">
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
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map(path => (
              <div key={path.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{path.title}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                      {path.difficulty}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((path.completedCourses / path.totalCourses) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">Complete</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{path.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{path.completedCourses}/{path.totalCourses} courses</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor((path.completedCourses / path.totalCourses) * 100)}`}
                      style={{ width: `${(path.completedCourses / path.totalCourses) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{path.estimatedTime}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{path.totalCourses} courses</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPath(path.id)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {path.completedCourses > 0 ? 'Continue Learning' : 'Start Learning'}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Path Detail View */
        <div>
          <button
            onClick={() => setSelectedPath(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            ← Back to Learning Paths
          </button>

          {selectedPathData && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Path Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{selectedPathData.title}</h1>
                    <p className="text-blue-100 mb-4">{selectedPathData.description}</p>
                    <div className="flex items-center space-x-6 text-blue-100">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>{selectedPathData.estimatedTime}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        <span>{selectedPathData.totalCourses} courses</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-5 w-5 mr-2" />
                        <span>{selectedPathData.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold mb-1">
                      {Math.round((selectedPathData.completedCourses / selectedPathData.totalCourses) * 100)}%
                    </div>
                    <div className="text-blue-100">Complete</div>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              {selectedPathData.prerequisites.length > 0 && (
                <div className="px-6 py-4 bg-orange-50 border-b border-gray-200">
                  <h3 className="font-medium text-orange-900 mb-2">Prerequisites</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPathData.prerequisites.map(prereq => (
                      <span key={prereq} className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses List */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                <div className="space-y-4">
                  {selectedPathData.courses.map((course, index) => (
                    <div key={course.id} className={`p-4 rounded-lg border-2 transition-all ${
                      course.isLocked 
                        ? 'border-gray-200 bg-gray-50' 
                        : course.isCompleted 
                          ? 'border-emerald-200 bg-emerald-50'
                          : course.progress > 0
                            ? 'border-blue-200 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            course.isCompleted 
                              ? 'bg-emerald-500 text-white'
                              : course.progress > 0
                                ? 'bg-blue-500 text-white'
                                : course.isLocked
                                  ? 'bg-gray-300 text-gray-600'
                                  : 'bg-gray-200 text-gray-700'
                          }`}>
                            {course.isCompleted ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : course.isLocked ? (
                              <Lock className="h-4 w-4" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className={`font-bold ${course.isLocked ? 'text-gray-500' : 'text-gray-900'}`}>
                                {course.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                                {course.difficulty}
                              </span>
                            </div>
                            
                            <p className={`text-sm mb-3 ${course.isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                              {course.description}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                <span>{course.rating}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{course.enrolledCount.toLocaleString()} enrolled</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {course.skills.map(skill => (
                                <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            
                            {!course.isLocked && course.progress > 0 && (
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-gray-600">Progress</span>
                                  <span className="font-medium">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(course.progress)}`}
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          {course.isLocked ? (
                            <div className="text-sm text-gray-500">Complete previous courses</div>
                          ) : course.isCompleted ? (
                            <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4" />
                              <span>Completed</span>
                            </button>
                          ) : course.progress > 0 ? (
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                              <Play className="h-4 w-4" />
                              <span>Continue</span>
                            </button>
                          ) : (
                            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2">
                              <Play className="h-4 w-4" />
                              <span>Start</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LearningPaths;