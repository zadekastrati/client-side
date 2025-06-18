'use client';
import { useState } from 'react';
import Header from '../components/header/page';
import Footer from '../components/footer/page';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      const data = await res.json();
      alert(data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (error) {
      alert('Error sending message.');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
              {/* Contact Info - e lë të pandryshuar siç e kishe */}
              <div className="relative isolate">
                {/* Gradient background */}
                <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
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
                      <dt className="flex-none">
                        <svg className="h-7 w-6 text-zinc-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                        </svg>
                      </dt>
                      <dd>
                        123 Event Street<br />
                        New York, NY 10001<br />
                        United States
                      </dd>
                    </div>
                    <div className="flex gap-x-4">
                      <dt className="flex-none">
                        <svg className="h-7 w-6 text-zinc-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </dt>
                      <dd>
                        <a href="mailto:support@eventticketing.com" className="hover:text-zinc-900">
                          support@eventticketing.com
                        </a>
                      </dd>
                    </div>
                    <div className="flex gap-x-4">
                      <dt className="flex-none">
                        <svg className="h-7 w-6 text-zinc-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </dt>
                      <dd>
                        <a href="tel:+1 (555) 234-5678" className="hover:text-zinc-900">
                          +1 (555) 234-5678
                        </a>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-10">
                    <h3 className="text-lg font-semibold text-zinc-900">Follow us</h3>
                    <ul role="list" className="mt-4 flex gap-x-6">
                      <li><a href="#" className="text-zinc-500 hover:text-zinc-900">Twitter</a></li>
                      <li><a href="#" className="text-zinc-500 hover:text-zinc-900">LinkedIn</a></li>
                      <li><a href="#" className="text-zinc-500 hover:text-zinc-900">Facebook</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="relative isolate bg-white shadow-xl shadow-zinc-900/10 rounded-2xl p-8">
                <div className="grid grid-cols-1 gap-6">
                  {['name', 'email', 'subject'].map(field => (
                    <div key={field}>
                      <label htmlFor={field} className="block text-sm font-medium leading-6 text-zinc-900">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full rounded-lg border-0 px-4 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 text-sm sm:leading-6"
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-zinc-900">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-2 block w-full rounded-lg border-0 px-4 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 w-full"
                    >
                      Send message
                    </button>
                  </div>
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