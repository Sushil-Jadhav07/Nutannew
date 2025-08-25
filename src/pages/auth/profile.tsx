import React from 'react';
import { HeadMetadata } from '@/App';
import Container from '@/components/shared/container';
import UserProfile from '@/components/auth/UserProfile';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const ProfilePage: React.FC = () => {
  return (
    <>
      <HeadMetadata pageTitle="User Profile - Nutan Overseas" />
      <Container>
        <div className="py-8">
          <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        </div>
      </Container>
    </>
  );
};

export default ProfilePage;
