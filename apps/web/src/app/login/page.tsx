// apps/web/src/app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/';
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await login(email, password);
    if (result.success) {
      router.push(returnTo);
    } else {
      setError(result.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 bg-zinc-800 rounded-md border border-zinc-700 text-white focus:ring-teal-500 focus:border-teal-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 bg-zinc-800 rounded-md border border-zinc-700 text-white focus:ring-teal-500 focus:border-teal-500"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="p-3 bg-teal-600 rounded-md text-white font-bold hover:bg-teal-700 transition-colors"
        >
          Login
        </button>
      </form>
      <Link href={returnTo} className="mt-4 text-zinc-400 hover:text-teal-500 transition-colors text-sm">
        Back to {returnTo === '/' ? 'Home' : 'previous page'}
      </Link>
    </div>
  );
}
