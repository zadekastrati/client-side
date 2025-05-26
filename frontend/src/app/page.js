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
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Find Your Next Event</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover and book tickets for the most exciting events in your area
          </p>
          <Button 
            href="/events"
            size="large"
            variant="primary"
          >
            Browse All Events
          </Button>
        </div>

        {/* Featured Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEvents.map((event, index) => (
              <Card
                key={index}
                title={event.title}
                description={event.description}
                image={event.image}
                date={event.date}
                location={event.location}
                price={event.price}
                link={event.link}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              href="/events"
              variant="outline"
            >
              View More Events
            </Button>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-gray-600">Safe and encrypted transactions for your peace of mind</p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer service to assist you</p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Guaranteed Tickets</h3>
              <p className="text-gray-600">100% authentic tickets for all events</p>
            </div>
          </div>
        </section>
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
          { href: "/terms", label: "Terms of Service" },
          { href: "/faq", label: "FAQ" },
          { href: "/help", label: "Help Center" }
        ]}
      />
    </>
  );
} 