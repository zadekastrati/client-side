'use client';
import { useEffect, useState } from "react";
import Header from './components/header/page';
import Footer from './components/footer/page';


import SessionProviderWrapper from './SessionProviderWrapper';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/events');
        const data = await res.json();
        if (data.success) {
          const sortedEvents = data.data
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
          setEvents(sortedEvents);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLatestEvents();
  }, []);
  
  return (
    <SessionProviderWrapper>
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50/40">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
          
          <div className="mx-auto max-w-7xl px-6 pt-40 pb-24 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
                Your Gateway to Amazing Events
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600">
                Discover and book tickets for the most exciting events happening around you. From concerts to conferences, sports to theater - find it all here.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/events"
                  className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                >
                  Browse Events
                </a>
                <a href="/about" className="text-sm font-semibold leading-6 text-zinc-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Events Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Featured Events
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              Don't miss out on these popular events happening soon.
            </p>
          </div>

          {/* Event Grid */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {loading ? (
              <p className="text-center col-span-3 text-gray-500">Loading events...</p>
            ) : events.length > 0 ? (
              events.map((event) => (
                <article
                  key={event.id}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-zinc-900 px-8 pb-8 pt-40 sm:pt-48 lg:pt-64"
                >
                  <img
                    src={event.photoUrl || event.image || "https://via.placeholder.com/600x400?text=No+Image"}
                    alt={event.title || event.name}
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40" />
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                    <a href={`/events/${event.id}`}>
                      <span className="absolute inset-0" />
                      {event.title || event.name}
                    </a>
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-zinc-300">
                    <time dateTime={event.date ? event.date.split("T")[0] : ""}>
                      {event.date ? new Date(event.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) : "Date TBA"}
                    </time>
                    <span className="mx-2">•</span>
                    {event.location || "Location TBA"}
                  </div>
                </article>
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-500">No events found.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
    </SessionProviderWrapper>
  );
}
