# Google Authentication Setup Guide

## The Problem
You're getting the error: `Firebase: Error (auth/operation-not-allowed)` when trying to sign in with Google. This error occurs when Google authentication is not enabled in your Firebase project.

## Solution Steps

### 1. Enable Google Authentication in Firebase Console

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: `nutandev-f7518`

2. **Navigate to Authentication**
   - In the left sidebar, click on "Authentication"
   - Click on the "Sign-in method" tab

3. **Enable Google Provider**
   - Find "Google" in the list of providers
   - Click on it to configure
   - Toggle the "Enable" switch to ON
   - Add your project's support email (required)
   - Click "Save"

### 2. Configure OAuth Consent Screen (if needed)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Select the same project: `nutandev-f7518`

2. **Navigate to OAuth Consent Screen**
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" user type
   - Fill in the required information:
     - App name: "Nutan Overseas"
     - User support email: your email
     - Developer contact information: your email

3. **Add Scopes**
   - Click "Add or Remove Scopes"
   - Add these scopes:
     - `../auth/userinfo.email`
     - `../auth/userinfo.profile`
     - `openid`

4. **Add Test Users (for testing)**
   - Add your email and any other test emails
   - This allows testing before going live

### 3. Configure Authorized Domains

1. **In Firebase Console**
   - Go to Authentication > Settings
   - Scroll down to "Authorized domains"
   - Add these domains:
     - `localhost` (for development)
     - `nutandev-f7518.firebaseapp.com`
     - Your production domain (when ready)

### 4. Test the Configuration

1. **Restart your development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Try Google Sign-in**
   - Go to your login page
   - Click "Sign in with Google"
   - You should see the Google OAuth popup

### 5. Common Issues and Solutions

#### Issue: "This app isn't verified"
- **Solution**: This is normal for development. Click "Advanced" > "Go to [App Name] (unsafe)" to proceed.

#### Issue: "Access blocked: This app's request is invalid"
- **Solution**: Check that your authorized domains include `localhost` and your domain.

#### Issue: "Error 400: redirect_uri_mismatch"
- **Solution**: In Google Cloud Console, go to "Credentials" > "OAuth 2.0 Client IDs" and add your redirect URIs.

### 6. Production Deployment

When deploying to production:

1. **Update Authorized Domains**
   - Add your production domain to Firebase Console
   - Add your production domain to Google Cloud Console

2. **Update OAuth Consent Screen**
   - Add your production domain
   - Submit for verification if needed

3. **Environment Variables**
   - Make sure your production environment uses the correct Firebase config

## Code Changes Made

The following improvements have been made to your authentication code:

1. **Enhanced Error Handling**: Better error messages for different Firebase errors
2. **Added Scopes**: Explicitly requesting email and profile scopes
3. **Custom Parameters**: Added `prompt: 'select_account'` for better UX
4. **Better Logging**: Console logs for debugging

## Testing Checklist

- [ ] Google authentication is enabled in Firebase Console
- [ ] OAuth consent screen is configured
- [ ] Authorized domains include localhost
- [ ] Test users are added (if needed)
- [ ] Development server is restarted
- [ ] Google sign-in popup appears
- [ ] User can successfully sign in with Google

## Support

If you continue to have issues:

1. Check the browser console for detailed error messages
2. Verify all Firebase configuration settings
3. Ensure your Firebase project is active and not suspended
4. Check that your Google Cloud project is properly linked to Firebase

The error should be resolved once Google authentication is properly enabled in your Firebase project.
