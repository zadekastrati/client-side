'use client';
import { useState } from 'react';
import Card from '../components/card/page';
import Header from '../components/header/page';
import Footer from '../components/footer/page';

export default function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Sample events data - in a real app, this would come from an API or database
  const events = [
    {
      title: "Summer Music Festival",
      description: "Three days of amazing music featuring top artists",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "July 15-17, 2024",
      location: "Central Park, NY",
      price: 199,
      link: "/events/1"
    },
    {
      title: "Tech Conference 2024",
      description: "Join industry leaders in technology and innovation",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "August 20-22, 2024",
      location: "Convention Center",
      price: 299,
      link: "/events/2"
    },
    {
      title: "Food & Wine Festival",
      description: "Experience culinary delights from top chefs",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "September 5-7, 2024",
      location: "Downtown Food District",
      price: 149,
      link: "/events/3"
    },
    {
      title: "Sports Championship",
      description: "Watch the finals of the national championship",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "October 15, 2024",
      location: "Sports Arena",
      price: 89,
      link: "/events/4"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50/40">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
          
          <div className="mx-auto max-w-7xl px-6 pt-40 pb-24 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl text-center">
                Discover Events
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600 text-center">
                Find and book tickets for the most exciting events happening around you
              </p>
              
              <div className="mt-10">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events..."
                    className="block w-full rounded-full border-0 px-6 py-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 text-base"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="h-5 w-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Upcoming Events
            </h2>
            <div className="flex flex-wrap gap-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-w-[160px] rounded-lg border-0 py-2.5 pl-4 pr-8 text-zinc-900 ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-zinc-600 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="music">Music</option>
                <option value="tech">Technology</option>
                <option value="sports">Sports</option>
                <option value="food">Food & Drink</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="min-w-[160px] rounded-lg border-0 py-2.5 pl-4 pr-8 text-zinc-900 ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-zinc-600 text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="popularity">Sort by Popularity</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
            {events.map((event, index) => (
              <Card
                key={index}
                {...event}
              />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <button className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 transition-colors duration-200">
              Load More Events
            </button>
          </div>
        </div>
      </main>
      <Footer 
        companyName="EventTicketing"
        socialLinks={[
          { href: "https://facebook.com", label: "Facebook", icon: "fb" },
          { href: "https://twitter.com", label: "Twitter", icon: "tw" },
          { href: "https://instagram.com", label: "Instagram", icon: "ig" }
        ]}
        footerLinks={[
          { href: "/about", label: "About Us" },
          { href: "/contact", label: "Contact" },
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" }
        ]}
      />
    </>
  );
} 