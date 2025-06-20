'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Header from '../components/header/page';
import Footer from '../components/footer/page';

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success'|'error', text: string }

  const onSubmit = async (data) => {
    setStatusMessage(null);
    try {
      const res = await fetch('http://localhost:5001/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send message');
      const result = await res.json();
      setStatusMessage({ type: 'success', text: result.message || 'Message sent successfully! 🎉' });
      reset();
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Oops! Something went wrong while sending your message. Please try again.' });
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50/40 pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl flex items-center justify-center gap-3">
              <span>📬</span> Get in Touch
            </h1>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              We'd love to hear from you. Fill out the form below or send us an email anytime.
            </p>
          </div>

          <div className="mx-auto max-w-5xl mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <section className="relative isolate rounded-3xl bg-white p-10 shadow-lg shadow-zinc-900/10">
              <h2 className="text-3xl font-semibold text-zinc-900 mb-6">Contact Information</h2>
              <p className="text-zinc-600 mb-8">
                Have questions? We're here to help. Send us a message and we'll get back to you ASAP.
              </p>

              <dl className="space-y-7 text-zinc-700 text-base">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <dd>123 Event Street, New York, NY 10001</dd>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <dd>
                    <a href="mailto:support@eventticketing.com" className="hover:text-zinc-900 underline transition">
                      support@eventticketing.com
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <dd>
                    <a href="tel:+15552345678" className="hover:text-zinc-900 underline transition">
                      +1 (555) 234-5678
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-12">
                <h3 className="text-xl font-semibold text-zinc-900 mb-4">Follow us</h3>
                <ul className="flex gap-8 text-zinc-500">
                  {[
                    {
                      label: 'Twitter',
                      href: '#',
                      svgPath: 'M8.29 20c7.547 0 11.675-6.155 11.675-11.49 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.27 8.27 0 01-2.357.636 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.978 4.107 4.107 0 00-6.993 3.743A11.65 11.65 0 013 4.913a4.07 4.07 0 001.27 5.482 4.093 4.093 0 01-1.86-.512v.05a4.106 4.106 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
                    },
                    {
                      label: 'LinkedIn',
                      href: '#',
                      svgPath: 'M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 11-0 4 2 2 0 010-4z',
                    },
                    {
                      label: 'Facebook',
                      href: '#',
                      svgPath: 'M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-1.6 1-3 3-3h2v3h-2v2h2l-1 3h-1v7A10 10 0 0022 12z',
                    },
                  ].map(({ label, href, svgPath }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="hover:text-zinc-900 transition"
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          className="h-7 w-7"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d={svgPath} />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="bg-white rounded-3xl p-10 shadow-lg shadow-zinc-900/10 flex flex-col gap-6"
            >
              {statusMessage && (
                <div
                  className={`rounded-md px-4 py-3 text-center font-semibold ${
                    statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                  role="alert"
                >
                  {statusMessage.text}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-900">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby="name-error"
                  placeholder="Your full name"
                  {...register('name', { required: 'Name is required' })}
                  className={`mt-2 block w-full rounded-lg border px-4 py-2 text-sm text-zinc-900 ring-1 focus:ring-2 transition ${
                    errors.name
                      ? 'border-red-500 ring-red-500 focus:ring-red-600'
                      : 'border-zinc-300 ring-zinc-300 focus:ring-zinc-900'
                  }`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-900">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby="email-error"
                  placeholder="you@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email format',
                    },
                  })}
                  className={`mt-2 block w-full rounded-lg border px-4 py-2 text-sm text-zinc-900 ring-1 focus:ring-2 transition ${
                    errors.email
                      ? 'border-red-500 ring-red-500 focus:ring-red-600'
                      : 'border-zinc-300 ring-zinc-300 focus:ring-zinc-900'
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-zinc-900">
                  Subject <span className="text-red-600">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  aria-invalid={errors.subject ? 'true' : 'false'}
                  aria-describedby="subject-error"
                  placeholder="Subject of your message"
                  {...register('subject', { required: 'Subject is required' })}
                  className={`mt-2 block w-full rounded-lg border px-4 py-2 text-sm text-zinc-900 ring-1 focus:ring-2 transition ${
                    errors.subject
                      ? 'border-red-500 ring-red-500 focus:ring-red-600'
                      : 'border-zinc-300 ring-zinc-300 focus:ring-zinc-900'
                  }`}
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1 text-sm text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-900">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby="message-error"
                  placeholder="Write your message here..."
                  {...register('message', {
                    required: 'Message is required',
                    minLength: { value: 10, message: 'At least 10 characters' },
                    maxLength: { value: 1000, message: 'Max 1000 characters' },
                  })}
                  className={`mt-2 block w-full rounded-lg border px-4 py-2 text-sm text-zinc-900 ring-1 focus:ring-2 transition resize-y ${
                    errors.message
                      ? 'border-red-500 ring-red-500 focus:ring-red-600'
                      : 'border-zinc-300 ring-zinc-300 focus:ring-zinc-900'
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 self-start rounded-lg bg-zinc-900 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/30 transition-transform duration-150 hover:scale-105 hover:bg-zinc-700 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
