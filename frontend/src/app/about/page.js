'use client';
import Header from '../components/header/page';
import Footer from '../components/footer/page';

export default function About() {
  const team = [
    {
      name: 'Zade Kastrati',
      role: 'CEO & Founder',
      image: '/images/profile.jpg',
    },
    {
      name: 'Erza Koxha',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Elza Ameti',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  const stats = [
    { value: '1M+', label: 'Active users' },
    { value: '50K+', label: 'Events hosted' },
    { value: '100+', label: 'Cities covered' },
    { value: '99%', label: 'Customer satisfaction' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50/40">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden pt-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
          
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
                About EventTicketing
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600">
                We're on a mission to make event ticketing simple, secure, and accessible to everyone. Our platform connects event organizers with attendees, creating unforgettable experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-zinc-600">{stat.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Mission Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl text-center">
              Our Mission
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 text-base leading-7 text-zinc-600 sm:grid-cols-2">
              <div>
                <p>
                  At EventTicketing, we believe that great events have the power to bring people together and create lasting memories. Our platform is designed to make the process of discovering, organizing, and attending events as seamless as possible.
                </p>
                <p className="mt-8">
                  We work tirelessly to provide the best possible experience for both event organizers and attendees. From small local gatherings to large-scale concerts, we're here to help make every event a success.
                </p>
              </div>
              <div>
                <p>
                  Security and reliability are at the core of everything we do. We use state-of-the-art technology to ensure that every transaction is safe and every ticket is authentic. Our customer support team is available 24/7 to assist with any questions or concerns.
                </p>
                <p className="mt-8">
                  We're committed to supporting the events industry and helping it grow. Through our platform, we aim to make events more accessible, inclusive, and enjoyable for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl text-center">
              Our Team
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 text-center">
              Meet the people behind EventTicketing who work every day to make your event experience better.
            </p>
            <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((person) => (
                <li key={person.name} className="text-center">
                  <img
                    className="mx-auto h-24 w-24 rounded-full object-cover"
                    src={person.image}
                    alt={person.name}
                    width={256}
                    height={256}
                  />
                  <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-zinc-900">
                    {person.name}
                  </h3>
                  <p className="text-sm leading-6 text-zinc-600">{person.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 