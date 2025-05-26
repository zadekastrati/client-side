'use client';
import Header from './components/header/page';
import Footer from './components/footer/page';
import Card from './components/card/page';
import Button from './components/button/page';

export default function Home() {
  const featuredEvents = [
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
            {/* Event Card 1 */}
            <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-zinc-900 px-8 pb-8 pt-40 sm:pt-48 lg:pt-64">
              <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4" alt="Event 1" className="absolute inset-0 -z-10 h-full w-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40" />
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href="/events/1">
                  <span className="absolute inset-0" />
                  Summer Music Festival
                </a>
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-zinc-300">
                <time dateTime="2024-07-15">July 15, 2024</time>
                <span className="mx-2">•</span>
                Central Park, NY
              </div>
            </article>

            {/* Event Card 2 */}
            <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-zinc-900 px-8 pb-8 pt-40 sm:pt-48 lg:pt-64">
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87" alt="Event 2" className="absolute inset-0 -z-10 h-full w-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40" />
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href="/events/2">
                  <span className="absolute inset-0" />
                  Tech Conference 2024
                </a>
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-zinc-300">
                <time dateTime="2024-08-20">August 20, 2024</time>
                <span className="mx-2">•</span>
                Convention Center
              </div>
            </article>

            {/* Event Card 3 */}
            <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-zinc-900 px-8 pb-8 pt-40 sm:pt-48 lg:pt-64">
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1" alt="Event 3" className="absolute inset-0 -z-10 h-full w-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40" />
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href="/events/3">
                  <span className="absolute inset-0" />
                  Food & Wine Festival
                </a>
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-zinc-300">
                <time dateTime="2024-09-05">September 5, 2024</time>
                <span className="mx-2">•</span>
                Downtown Food District
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 