"use client";

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'client';
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return; // Still loading, do nothing
    }

    if (!user) {
      // Not authenticated, redirect to login
      router.push(`/login?returnTo=${window.location.pathname}`);
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      // Authenticated but unauthorized, redirect to a specific page
      router.push('/unauthorized'); // Or a generic error page
      return;
    }

    // User is authenticated and has the correct role
    // Dynamic redirection based on user role
    const currentPath = window.location.pathname;
    if (user.role === 'admin' && !currentPath.startsWith('/admin')) {
      router.push('/admin/dashboard');
      return;
    }
    if (user.role === 'client' && !currentPath.startsWith('/client')) {
      router.push('/client/dashboard');
      return;
    }

  }, [user, isLoading, requiredRole, router]);

  if (isLoading || !user || (requiredRole && user.role !== requiredRole)) {
    // Show a loading spinner or some fallback UI while redirecting
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <>{children}</>; // Render the protected content
};
