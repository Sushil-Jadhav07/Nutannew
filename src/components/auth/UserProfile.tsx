import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useToast } from '@/contexts/ToastContext';

const UserProfile: React.FC = () => {
  const { user, loading } = useContext(AuthContext);
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast('Successfully logged out!', 'success');
      // Success - user will be redirected automatically via AuthProvider
    } catch (error) {
      console.error('Logout failed:', error);
      showToast('Logout failed. Please try again.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No user logged in</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-200"
          />
        ) : (
          <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-blue-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-gray-900">
          {user.displayName || 'User'}
        </h2>
        
        <p className="text-gray-600">{user.email}</p>
        
        {user.emailVerified && (
          <div className="inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Email Verified
          </div>
        )}
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600 font-medium">User ID:</span>
          <span className="text-gray-900 text-sm font-mono">{user.uid}</span>
        </div>
        
        {user.createdAt && (
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium">Member since:</span>
            <span className="text-gray-900 text-sm">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Signing out...' : 'Sign Out'}
      </button>
    </div>
  );
};

export default UserProfile;
