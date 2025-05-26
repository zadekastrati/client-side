import Card from '../components/card/page';
import Header from '../components/header/page';
import Footer from '../components/footer/page';

export default function Events() {
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
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl text-gray-600">
            Discover and book tickets for amazing events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
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