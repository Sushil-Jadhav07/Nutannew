import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Link } from 'react-router-dom';

const AuthDemo: React.FC = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Success - user will be redirected automatically via AuthProvider
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication Status</h3>
      
      {isAuthenticated ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900">
                {user?.displayName || 'User'}
              </p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Link
              to="/profile"
              className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              View Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            {/* <p>User ID: {user?.uid}</p> */}
            {user?.createdAt && (
              <></>
              // <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
            )}
            {user?.emailVerified && (
              <p className="text-green-600">✓ Email verified</p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600">You are not logged in</p>
          <div className="flex space-x-2">
            <Link
              to="/login"
              className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthDemo;
