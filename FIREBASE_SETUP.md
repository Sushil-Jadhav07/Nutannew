# Firebase Setup Guide

## ✅ What's Already Done

- ✅ Firebase SDK installed (`firebase@^12.1.0`)
- ✅ Firebase configuration file created (`src/config/firebase.ts`)
- ✅ Example component created (`src/components/FirebaseExample.tsx`)
- ✅ Firebase banners integration merged into `src/components/hero/hero-slider-block.tsx`
- ✅ Custom hook for fetching Firebase banners (`src/hooks/useFirebaseBanners.ts`)
- ✅ Home page updated to use Firebase banners

## 🚀 Next Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

### 2. Get Your Firebase Configuration

1. In your Firebase project, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>) to add a web app
5. Register your app and copy the configuration object

### 3. Set Up Environment Variables

1. Create a `.env` file in your project root
2. Copy the contents from `firebase-env-example.txt`
3. Replace the placeholder values with your actual Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Enable Firebase Services

In your Firebase Console, enable the services you want to use:

#### Authentication
- Go to Authentication > Sign-in method
- Enable Email/Password authentication

#### Firestore Database
- Go to Firestore Database
- Click "Create database"
- Choose your location and start in test mode

#### Storage (optional)
- Go to Storage
- Click "Get started"
- Choose your location and start in test mode

### 5. Test the Integration

1. Import and use the `FirebaseExample` component in your app
2. Or create your own components using the Firebase services from `src/config/firebase.ts`

## 📁 File Structure

```
src/
├── config/
│   └── firebase.ts          # Firebase configuration and services
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx    # Login form with email/password and Google
│   │   ├── SignupForm.tsx   # Signup form with email/password and Google
│   │   ├── UserProfile.tsx  # User profile display and logout
│   │   └── ProtectedRoute.tsx # Route protection component
│   ├── hero/
│   │   └── hero-slider-block.tsx  # Hero slider with built-in Firebase support
│   └── FirebaseExample.tsx  # Example component showing Firebase usage
├── contexts/
│   └── AuthProvider.tsx     # Firebase auth state provider
├── hooks/
│   ├── useFirebaseBanners.ts # Custom hook for fetching Firebase banners
│   └── useAuth.ts           # Custom hook for authentication
├── pages/
│   └── auth/
│       ├── login.tsx        # Login page
│       ├── signup.tsx       # Signup page
│       └── profile.tsx      # Protected profile page
└── store/
    ├── index.ts             # Redux store configuration
    ├── hooks.ts             # Typed Redux hooks
    └── slices/
        └── authSlice.ts     # Authentication state management
```

## 🔧 Available Firebase Services

The following services are pre-configured and ready to use:

- **Authentication** (`auth`) - User sign-in, sign-up, sign-out with Google OAuth
- **Firestore** (`db`) - NoSQL database
- **Storage** (`storage`) - File storage
- **Analytics** (`analytics`) - User behavior tracking

## 🔐 Authentication System

A complete authentication system has been implemented with:

- **Redux Toolkit Integration**: State management for auth
- **Email/Password Authentication**: Traditional login/signup
- **Google OAuth**: One-click Google sign-in
- **Protected Routes**: Route protection based on auth status
- **User Profile Management**: Display and manage user information
- **Automatic Auth State**: Firebase auth state synchronization

## 🎯 Banner Integration

Your Firebase banners are now automatically integrated into the HeroSliderBlock:

- **Automatic Fetching**: Banners are fetched from Firebase Firestore
- **Smart Filtering**: Only banners with required fields (title, subtitle, imageUrl) AND status ≠ "active" are displayed
- **Fallback Support**: Falls back to static banners if Firebase is unavailable
- **Loading States**: Shows loading spinner while fetching data
- **Error Handling**: Gracefully handles Firebase connection issues

### Banner Data Structure

Your Firebase banners should have this structure:
```typescript
{
  title: string,        // Banner title (required)
  subtitle: string,     // Banner subtitle/description (required)
  imageUrl: string,     // Image URL from Firebase Storage (required)
  status: string,       // Status field (optional)
  createdAt: timestamp  // Creation timestamp (optional)
}
```

**Note**: Only banners with all required fields (title, subtitle, imageUrl) AND status ≠ "active" will be displayed.

### Usage

The `HeroSliderBlock` component now has built-in Firebase support. Simply add the `useFirebase` prop:

```tsx
import HeroSliderBlock from "@/components/hero/hero-slider-block";

// Use with Firebase (recommended)
<HeroSliderBlock
  useFirebase={true}
  fallbackBanners={staticBanners}
  showHeroContent={true}
  className="your-classes"
/>

// Use without Firebase (original behavior)
<HeroSliderBlock
  heroBanner={staticBanners}
  showHeroContent={true}
  className="your-classes"
/>
```

### Authentication Usage

#### Using the useAuth Hook
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

## 📖 Usage Examples

### Authentication
```typescript
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Sign in
const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Signed in:', user);
  } catch (error) {
    console.error('Error signing in:', error);
  }
};
```

### Firestore
```typescript
import { db } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Add a document
const addDocument = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, 'collection-name'), data);
    console.log('Document added with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};

// Get documents
const getDocuments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'collection-name'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  } catch (error) {
    console.error('Error getting documents:', error);
  }
};
```

## 🚨 Security Rules

Don't forget to set up proper security rules in your Firebase Console:

- **Firestore**: Go to Firestore Database > Rules
- **Storage**: Go to Storage > Rules

## 🔍 Troubleshooting

- Make sure your `.env` file is in the project root
- Verify all environment variables are prefixed with `VITE_`
- Check that your Firebase project has the required services enabled
- Ensure your Firebase configuration values are correct

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase React SDK](https://firebase.google.com/docs/web/setup)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
