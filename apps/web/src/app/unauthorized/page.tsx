// apps/web/src/app/unauthorized/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-xl text-zinc-400 mb-8 text-center">
        You do not have permission to view this page.
      </p>
      <Link href="/" className="text-teal-500 hover:text-teal-400 transition-colors text-lg">
        Go to Home
      </Link>
    </div>
  );
}
