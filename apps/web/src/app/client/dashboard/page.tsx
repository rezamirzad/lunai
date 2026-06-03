// apps/web/src/app/client/dashboard/page.tsx
"use client";

import React from 'react';
import { AuthGuard } from '@/components/AuthGuard';

export default function ClientDashboardPage() {
  return (
    <AuthGuard requiredRole="client">
      <div className="min-h-screen bg-zinc-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>
        <p className="text-zinc-400">Welcome, Client!</p>
        {/* Client specific content here */}
      </div>
    </AuthGuard>
  );
}
