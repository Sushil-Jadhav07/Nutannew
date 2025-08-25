# 🔐 Firebase Authentication System

A complete authentication system built with Firebase, Redux Toolkit, and React that provides email/password and Google OAuth authentication.

## ✨ Features

- **🔑 Email/Password Authentication**: Traditional login and signup
- **🌐 Google OAuth**: One-click Google sign-in
- **📱 Responsive Design**: Mobile-first UI with Tailwind CSS
- **⚡ Real-time State**: Automatic Firebase auth state synchronization
- **🛡️ Protected Routes**: Route protection based on authentication status
- **👤 User Profiles**: Display and manage user information
- **📊 Redux Integration**: Centralized state management
- **🔄 Loading States**: Smooth loading and error handling

## 🚀 Quick Start

### 1. Firebase Setup

Make sure you have Firebase configured in your project:

```typescript
// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase config here
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 2. Enable Authentication Methods

In your Firebase Console:
1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** (configure OAuth consent screen)

### 3. Usage

#### Basic Authentication Hook

```tsx
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    const result = await login('user@example.com', 'password');
    if (result.success) {
      console.log('Logged in successfully!');
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.displayName}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```

#### Protected Routes

```tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const ProtectedPage = () => (
  <ProtectedRoute>
    <div>This content is only visible to authenticated users</div>
  </ProtectedRoute>
);
```

## 📁 Component Structure

### Core Components

- **`LoginForm`**: Email/password and Google login
- **`SignupForm`**: Email/password and Google signup
- **`UserProfile`**: Display user information and logout
- **`ProtectedRoute`**: Route protection wrapper
- **`AuthDemo`**: Demo component showing auth states

### Pages

- **`/login`**: Login page
- **`/signup`**: Signup page
- **`/profile`**: Protected user profile page

## 🔧 Redux Store

### Auth Slice

The authentication state is managed in Redux with the following structure:

```typescript
interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

### Actions

- `signInWithEmail`: Email/password login
- `signUpWithEmail`: Email/password signup
- `signInWithGoogle`: Google OAuth login
- `signOutUser`: User logout
- `setUser`: Set user data
- `clearError`: Clear error messages

## 🎨 UI Components

### Login Form

```tsx
import LoginForm from '@/components/auth/LoginForm';

// Full-screen login form
<LoginForm />
```

### Signup Form

```tsx
import SignupForm from '@/components/auth/SignupForm';

// Full-screen signup form
<SignupForm />
```

### User Profile

```tsx
import UserProfile from '@/components/auth/UserProfile';

// User profile display
<UserProfile />
```

## 🛡️ Security Features

### Route Protection

```tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const AdminPage = () => (
  <ProtectedRoute>
    <div>Admin content here</div>
  </ProtectedRoute>
);
```

### Authentication State

The system automatically:
- Syncs with Firebase auth state
- Redirects unauthenticated users
- Handles loading states
- Manages error messages

## 🔄 State Management

### Redux Hooks

```tsx
import { useAppSelector, useAppDispatch } from '@/store/hooks';

// Access auth state
const { user, isAuthenticated } = useAppSelector(state => state.auth);

// Dispatch actions
const dispatch = useAppDispatch();
dispatch(signOutUser());
```

### Custom Auth Hook

```tsx
import { useAuth } from '@/hooks/useAuth';

const { user, isAuthenticated, login, logout, loading, error } = useAuth();
```

## 📱 Responsive Design

All components are built with Tailwind CSS and are fully responsive:

- **Mobile-first approach**
- **Touch-friendly buttons**
- **Responsive layouts**
- **Accessible forms**

## 🚨 Error Handling

The system provides comprehensive error handling:

- **Firebase errors**: Automatically captured and displayed
- **Validation errors**: Form validation with user feedback
- **Network errors**: Graceful fallbacks and retry options
- **Loading states**: Clear indication of async operations

## 🔧 Configuration

### Environment Variables

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Firebase Rules

Ensure your Firebase security rules allow authentication:

```javascript
// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🧪 Testing

### Testing Authentication

1. **Login Flow**: Test email/password and Google login
2. **Signup Flow**: Test new user registration
3. **Protected Routes**: Verify access control
4. **Error Handling**: Test invalid credentials
5. **State Persistence**: Verify auth state across page reloads

## 📚 Examples

### Complete Authentication Flow

```tsx
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const AuthHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">My App</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">
                  Welcome, {user?.displayName || user?.email}
                </span>
                <Link
                  to="/profile"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
```

## 🆘 Troubleshooting

### Common Issues

1. **Firebase not initialized**: Check your Firebase configuration
2. **Google OAuth not working**: Verify OAuth consent screen setup
3. **Redux store errors**: Ensure providers are properly wrapped
4. **Route protection not working**: Check ProtectedRoute implementation

### Debug Mode

Enable console logging for debugging:

```typescript
// In your components
console.log('Auth state:', { user, isAuthenticated, loading, error });
```

## 📖 Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

When contributing to the authentication system:

1. **Follow TypeScript best practices**
2. **Maintain responsive design**
3. **Add proper error handling**
4. **Include loading states**
5. **Test authentication flows**
6. **Update documentation**

---

**Built with ❤️ using Firebase, Redux Toolkit, and React**
