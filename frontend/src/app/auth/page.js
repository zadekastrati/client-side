  'use client';
  import { useState } from 'react';
  import Header from '../components/header/page';
  import Footer from '../components/footer/page';
  import { signIn } from "next-auth/react";


  export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: true,
          email,
          password,
          callbackUrl: "/",
        });
      } else {
        // Register flow
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
    
        if (res.ok) {
          alert('Registration successful! Please log in.');
          setIsLogin(true);
          setName('');
          setEmail('');
          setPassword('');
        } else {
          const data = await res.json();
          alert(data.message || 'Registration failed');
        }
      }
    };
    
    
    return (
      <>
        <Header />
        <main className="min-h-screen bg-zinc-50/40 pt-24 pb-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              {/* Auth Card */}
              <div className="relative isolate bg-white shadow-xl shadow-zinc-900/10 rounded-2xl">
                {/* Background decoration */}
                <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
                  <div className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-zinc-200 to-zinc-400 opacity-30"></div>
                </div>

                <div className="p-12">
                  {/* Header */}
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                      {isLogin ? 'Welcome back' : 'Create your account'}
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {isLogin ? "Don't have an account?" : 'Already have an account?'}
                      {' '}
                      <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-semibold text-zinc-900 hover:text-zinc-700"
                      >
                        {isLogin ? 'Sign up' : 'Sign in'}
                      </button>
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-zinc-900">
                          Full name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-2 block w-full rounded-lg border-0 px-4 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 text-sm sm:leading-6"
                          required
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-zinc-900">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 block w-full rounded-lg border-0 px-4 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 text-sm sm:leading-6"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-zinc-900">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 block w-full rounded-lg border-0 px-4 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 text-sm sm:leading-6"
                        required
                      />
                    </div>

                    {isLogin && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                          />
                          <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-600">
                            Remember me
                          </label>
                        </div>
                        <button type="button" className="text-sm font-semibold text-zinc-900 hover:text-zinc-700">
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="mt-8 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                    >
                      {isLogin ? 'Sign in' : 'Create account'}
                    </button>
                  </form>

                  {/* Social login */}
                  <div className="mt-10">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-zinc-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="bg-white px-6 text-zinc-600">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50">
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </button>
                      <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1877F2] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0C63D4]">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9.95235 15.6L10.3333 12H6.66667V9.6C6.66667 8.36 7 7.6 8.66667 7.6H10.3333V4.48C9.72 4.48 8.66667 4.32 7.66667 4.32C4.66667 4.32 2.66667 6.24 2.66667 9.6V12H0V15.6H2.66667V24H6.66667V15.6H9.95235Z" />
                        </svg>
                        Facebook
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  } 