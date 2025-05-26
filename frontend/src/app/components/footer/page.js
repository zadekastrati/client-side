'use client';
import Link from 'next/link';

export default function Footer({ 
  companyName = "EventTicketing",
  socialLinks = [
    { href: "https://facebook.com", label: "Facebook", icon: "fb" },
    { href: "https://twitter.com", label: "Twitter", icon: "tw" },
    { href: "https://instagram.com", label: "Instagram", icon: "ig" },
  ],
  footerLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ]
}) {
  const renderSocialIcon = (icon) => {
    switch (icon) {
      case 'fb':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        );
      case 'tw':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        );
      case 'ig':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z"></path>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path>
            <path d="M16.5 7.5C16.5 7.77614 16.2761 8 16 8C15.7239 8 15.5 7.77614 15.5 7.5C15.5 7.22386 15.7239 7 16 7C16.2761 7 16.5 7.22386 16.5 7.5Z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-900">
              {companyName}
            </Link>
            <p className="text-sm leading-6 text-zinc-600">
              Your premier destination for event tickets. Find and book tickets for your favorite events with secure, hassle-free booking.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-500"
                  aria-label={link.label}
                >
                  {renderSocialIcon(link.icon)}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-zinc-900">Quick Links</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.slice(0, footerLinks.length/2).map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm leading-6 text-zinc-600 hover:text-zinc-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-zinc-900">Resources</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.slice(footerLinks.length/2).map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm leading-6 text-zinc-600 hover:text-zinc-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-900/10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs leading-5 text-zinc-500">
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </p>
            <form className="flex w-full max-w-md">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                type="email"
                name="email"
                id="email-address"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-l-lg border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 text-sm sm:leading-6"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
} 