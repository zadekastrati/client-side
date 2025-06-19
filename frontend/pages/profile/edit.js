'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function EditProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session]);

  if (status === 'loading') {
    return <p className="text-center mt-10 text-lg text-gray-500">Loading...</p>;
  }

  if (!session?.user) {
    router.push('/auth'); // redirect if not logged in
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/update_profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      router.push('/');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto mt-24 p-8 bg-gradient-to-tr from-violet-50 to-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-violet-700 tracking-wide">
        Edit Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-7">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-violet-600 font-semibold text-sm tracking-wide"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border-2 border-violet-300 px-4 py-3 text-gray-900 placeholder-violet-300
              focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-300 transition"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-violet-600 font-semibold text-sm tracking-wide"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border-2 border-violet-300 px-4 py-3 text-gray-900 placeholder-violet-300
              focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-300 transition"
            placeholder="you@example.com"
          />
        </div>

        {error && (
          <p className="text-center text-red-600 font-semibold animate-pulse">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-bold tracking-wide transition
            ${
              loading
                ? 'bg-violet-400 cursor-not-allowed'
                : 'bg-violet-600 hover:bg-violet-700 shadow-lg'
            }`}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </main>
  );
}
