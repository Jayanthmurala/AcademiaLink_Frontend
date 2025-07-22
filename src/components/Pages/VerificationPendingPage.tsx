import React from 'react';
import { Clock, Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const VerificationPendingPage: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="h-8 w-8 text-orange-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Account Verification Pending</h1>
        
        <p className="text-gray-600 mb-6">
          Your account is currently under review by the college administration. You'll receive access once your account is verified.
        </p>
        
        <div className="bg-orange-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-700 space-y-2">
            <p><span className="font-medium">Name:</span> {currentUser?.name}</p>
            <p><span className="font-medium">Email:</span> {currentUser?.email}</p>
            <p><span className="font-medium">Role:</span> {currentUser?.role}</p>
            <p><span className="font-medium">College:</span> {currentUser?.collegeName}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>You'll be notified via email once verified</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <RefreshCw className="h-4 w-4" />
            <span>This usually takes 1-2 business days</span>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPendingPage;