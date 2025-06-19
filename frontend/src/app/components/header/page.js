'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react'; // Import signOut and useSession

export default function Header({
  brandName = "EventTicketing",
  navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession(); // Get session data

  return (
    <header className="fixed w-full top-0 z-50">
      <div className="absolute inset-0 bg-white/[0.6] backdrop-blur-xl"></div>
      <nav className="relative mx-auto max-w-7xl px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative group">
            <span className="text-2xl font-bold tracking-tight text-zinc-800">
              {brandName}
            </span>
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-violet-500/0 via-violet-500/70 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Link>
            ))}

            {/* If user is logged in, show Logout button, else Sign In link */}
            {session?.user ? (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors duration-200"
                aria-label="Log out"
                title="Log out"
              >
                {/* Simple logout icon (SVG) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                </svg>
                Logout
              </button>
            ) : (
              <Link
                href="/auth"
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-zinc-900 rounded-full hover:bg-zinc-700 transition-colors duration-200"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative z-10 -m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 hover:bg-zinc-100/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            <div className="relative flex w-6 h-5 flex-col justify-between overflow-hidden">
              <span
                className={`h-0.5 w-6 bg-zinc-700 transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              ></span>
              <span
                className={`h-0.5 w-6 bg-zinc-700 transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`h-0.5 w-6 bg-zinc-700 transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden fixed inset-0 top-[65px] bg-white/90 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col space-y-1 px-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-3 text-base font-medium text-zinc-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-lg bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              </Link>
            ))}
            {session?.user ? (
              <button
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex w-full items-center justify-center px-5 py-3 text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth"
                className="inline-flex w-full items-center justify-center px-5 py-3 text-base font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
