import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock,  BookOpen, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
// import { mockColleges } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const AuthScreen: React.FC = () => {
  const navevigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // role: 'student' as 'student' | 'faculty' | 'admin',
    // collegeName: '',
    collegeId: '',
    // branch: '',
    department: '',
    year: 1
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success.success) {
          navevigate('/dashboard');
        } else {
          setError(success.message);
          setIsLoading(false);
          return;
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        
        // const selectedCollege = mockColleges.find(c => c.id === formData.collegeId);
        const userData = {
          name: formData.name,
          email: formData.email,
          // role: formData.role,
          collegeId: formData.collegeId,
          // collegeName: selectedCollege?.name || formData.collegeName,
          // branch: formData.role === 'student' ? formData.branch : undefined,
          department: formData.department,
          year: formData.year 
        };
        
        const success = await register(userData, formData.password);
        if (success.success) {
          setIsLogin(true);
          setError('Registration successful! Please login.');
        } else {
          setError(success.message);
          setIsLoading(false);
          return;
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">AL</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">AcademiaLink</h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Welcome back' : 'Join our community'}
          </p>
        </div>

        {error && (
          <div className={`mb-4 p-3 rounded-md text-sm ${error.includes('successful') ? 'bg-green-100 border border-green-300 text-green-700' : 'bg-red-100 border border-red-300 text-red-700'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your full name" />
                </div>
              </div>

              {/* College ID Input (Changed from Select) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College ID</label>
                <div className="relative">
                   <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                   <input type="text" name="collegeId" value={formData.collegeId} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your college ID" />
                </div>
              </div>

              {/* Department Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="text" name="department" value={formData.department} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Computer Science" />
                </div>
              </div>
              
              {/* Year Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select name="year" value={formData.year} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
            </div>
          </div>
          
          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} required className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirm your password" />
              </div>
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-blue-600 hover:text-blue-700 font-medium">
              {isLogin ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
        
        {isLogin && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <p>Email: demo@user.com / Password: password</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;