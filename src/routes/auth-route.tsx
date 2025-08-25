import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/utils/routes";
import { AuthContext } from "@/contexts/AuthProvider";

function AuthRoute({ children }: React.PropsWithChildren) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  // Show loading while checking authentication status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}

export default AuthRoute;
