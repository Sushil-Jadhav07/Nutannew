import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { 
  signInWithEmail, 
  signUpWithEmail, 
  signInWithGoogle, 
  signOutUser,
  clearError 
} from '../store/slices/authSlice';
import { useAppDispatch } from '../store/hooks';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    try {
      await dispatch(signInWithEmail({ email, password })).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error: error as string };
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await dispatch(signUpWithEmail({ email, password })).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error: error as string };
    }
  };

  const loginWithGoogle = async () => {
    try {
      await dispatch(signInWithGoogle()).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error: error as string };
    }
  };

  const logout = async () => {
    try {
      await dispatch(signOutUser()).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error: error as string };
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // State from AuthContext
    user: authContext.user,
    isAuthenticated: authContext.isAuthenticated,
    loading: authContext.loading,
    error: null, // We'll handle errors through Redux for now
    
    // Actions
    login,
    signup,
    loginWithGoogle,
    logout,
    clearAuthError,
  };
};
