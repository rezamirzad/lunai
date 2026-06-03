// apps/web/src/app/admin/dashboard/page.tsx
"use client";

import React from 'react';
import { AuthGuard } from '@/components/AuthGuard';
import { AdminPanel } from '@/components/AdminPanel'; // Import AdminPanel

export default function AdminDashboardPage() {
  const handleAddPost = (postData: any) => {
    console.log("AdminDashboardPage: Add Post requested", postData);
    // This would typically dispatch a server action to create a post
  };

  return (
    <AuthGuard requiredRole="admin">
      <div className="min-h-screen bg-zinc-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-zinc-400">Welcome, Admin!</p>

        <div className="mt-8">
          <AdminPanel onAddPost={handleAddPost} isAuthorized={true} />
        </div>
      </div>
    </AuthGuard>
  );
}