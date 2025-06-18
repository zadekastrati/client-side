'use client';

import { useForm } from 'react-hook-form';
import Header from '../components/header/page';
import Footer from '../components/footer/page';

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send message');
      const result = await res.json();
      alert(result.message || 'Message sent successfully!');
      reset();
    } catch (error) {
      alert('Error sending message.');
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50/40 pt-24 pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Get in touch
            </h1>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              We'd love to hear from you. Please fill out this form or shoot us an email.
            </p>
          </div>

          <div className="mx-auto max-w-5xl mt-16">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
              {/* Contact Info */}
              <div className="relative isolate">
                <div
                  className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
                  aria-hidden="true"
                >
                  <div className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-zinc-200 to-zinc-400 opacity-30"></div>
                </div>

                <div className="max-w-xl lg:max-w-lg">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                    Contact Information
                  </h2>
                  <p className="mt-4 text-base leading-7 text-zinc-600">
                    Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
                  </p>

                  <dl className="mt-10 space-y-6 text-base leading-7 text-zinc-600">
                    <div className="flex gap-x-4">
                      <dt className="flex-none">📍</dt>
                      <dd>123 Event Street, New York, NY 10001</dd>
                    </div>
                    <div className="flex gap-x-4">
                      <dt className="flex-none">📧</dt>
                      <dd>
                        <a href="mailto:support@eventticketing.com" className="hover:text-zinc-900">
                          support@eventticketing.com
                        </a>
                      </dd>
                    </div>
                    <div className="flex gap-x-4">
                      <dt className="flex-none">📞</dt>
                      <dd>
                        <a href="tel:+15552345678" className="hover:text-zinc-900">
                          +1 (555) 234-5678
                        </a>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-10">
                    <h3 className="text-lg font-semibold text-zinc-900">Follow us</h3>
                    <ul className="mt-4 flex gap-x-6">
                      <li>
                        <a href="#" className="text-zinc-500 hover:text-zinc-900" aria-label="Twitter">
                          <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8.29 20c7.547 0 11.675-6.155 11.675-11.49 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.27 8.27 0 01-2.357.636 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.978 4.107 4.107 0 00-6.993 3.743A11.65 11.65 0 013 4.913a4.07 4.07 0 001.27 5.482 4.093 4.093 0 01-1.86-.512v.05a4.106 4.106 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-zinc-500 hover:text-zinc-900" aria-label="LinkedIn">
                          <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 11-0 4 2 2 0 010-4z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-zinc-500 hover:text-zinc-900" aria-label="Facebook">
                          <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-1.6 1-3 3-3h2v3h-2v2h2l-1 3h-1v7A10 10 0 0022 12z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative isolate bg-white shadow-xl shadow-zinc-900/10 rounded-2xl p-8"
              >
                <div className="grid grid-cols-1 gap-6">
                  {/* ... form inputs as before ... */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-900">
                      Name
                    </label>
                    <input
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className="mt-2 block w-full rounded-lg border px-4 py-2 text-sm text-zinc-900 ring-1 ring-zinc-300 focus:ring-2 focus:ring-zinc-900"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-900">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email format',
                        },
                      })}
                      className="mt-2 block w-full rounded-lg border px-4 py-2 text-sm text-zinc-900 ring-1 ring-zinc-300 focus:ring-2 focus:ring-zinc-900"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-zinc-900">
                      Subject
                    </label>
                    <input
                      id="subject"
                      {...register('subject', { required: 'Subject is required' })}
                      className="mt-2 block w-full rounded-lg border px-4 py-2 text-sm text-zinc-900 ring-1 ring-zinc-300 focus:ring-2 focus:ring-zinc-900"
                    />
                    {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-900">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 10, message: 'At least 10 characters' },
                        maxLength: { value: 1000, message: 'Max 1000 characters' },
                      })}
                      className="mt-2 block w-full rounded-lg border px-4 py-2 text-sm text-zinc-900 ring-1 ring-zinc-300 focus:ring-2 focus:ring-zinc-900"
                    />
                    {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
