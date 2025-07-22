import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-8 w-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. This area is restricted to specific user roles.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Your current role:</span> {currentUser?.role || 'Unknown'}
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;