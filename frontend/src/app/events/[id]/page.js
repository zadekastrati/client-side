'use client';
import { useState } from 'react';
import Header from '../../components/header/page';
import Footer from '../../components/footer/page';
import Button from '../../components/button/page';

// This would typically come from an API or database
const eventsData = {
  "1": {
    title: "Summer Music Festival",
    description: "Three days of amazing music featuring top artists from around the world. Experience live performances across multiple stages, food vendors, art installations, and more. Don't miss this unforgettable weekend of music and entertainment!",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "July 15-17, 2024",
    location: "Central Park, NY",
    price: 199,
    ticketTypes: [
      { name: "General Admission", price: 199, description: "Access to all main stages" },
      { name: "VIP Pass", price: 399, description: "VIP areas, exclusive performances, meet & greet" },
      { name: "Single Day Pass", price: 89, description: "Access for one day of your choice" }
    ]
  },
  "2": {
    title: "Tech Conference 2024",
    description: "Join industry leaders in technology and innovation for three days of inspiring talks, workshops, and networking opportunities. Learn about the latest trends in AI, blockchain, cloud computing, and more.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "August 20-22, 2024",
    location: "Convention Center",
    price: 299,
    ticketTypes: [
      { name: "Standard Pass", price: 299, description: "Access to all talks and workshops" },
      { name: "Premium Pass", price: 499, description: "Additional networking events and exclusive sessions" },
      { name: "Virtual Pass", price: 149, description: "Online access to all sessions" }
    ]
  },
  "3": {
    title: "Food & Wine Festival",
    description: "Experience culinary delights from top chefs around the world. Enjoy wine tastings, cooking demonstrations, and gourmet food sampling in a beautiful outdoor setting.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "September 5-7, 2024",
    location: "Downtown Food District",
    price: 149,
    ticketTypes: [
      { name: "General Entry", price: 149, description: "Access to all food stalls and basic wine tastings" },
      { name: "Gourmet Pass", price: 299, description: "Additional premium wine tastings and chef meetups" },
      { name: "Chef's Table", price: 499, description: "Exclusive dining experiences with featured chefs" }
    ]
  },
  "4": {
    title: "Sports Championship",
    description: "Watch the finals of the national championship live in person. Experience the thrill and excitement as top teams compete for the championship title.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "October 15, 2024",
    location: "Sports Arena",
    price: 89,
    ticketTypes: [
      { name: "Standard Seat", price: 89, description: "Regular seating in main arena" },
      { name: "Premium Seat", price: 199, description: "Better viewing angles, closer to action" },
      { name: "VIP Box", price: 499, description: "Private box with catering and amenities" }
    ]
  }
};

export default function EventDetails({ params }) {
  const event = eventsData[params.id];
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    quantity: 1
  });

  const handleBookNow = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', {
      event: event.title,
      ticket: selectedTicket,
      ...bookingData
    });
    setIsModalOpen(false);
    setBookingData({ name: '', email: '', quantity: 1 });
    alert('Booking successful! Thank you for your purchase.');
  };

  if (!event) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
            <Button href="/events" variant="primary">View All Events</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[400px]">
            <img
              src={event.image}
              alt={event.title}
              className="absolute w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{event.description}</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-lg">{event.date}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg">{event.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Ticket Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {event.ticketTypes.map((ticket, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{ticket.name}</h3>
                <p className="text-gray-600 mb-4">{ticket.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${ticket.price}</span>
                  <Button 
                    variant="primary"
                    onClick={() => handleBookNow(ticket)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Book Tickets</h2>
              <h3 className="text-xl mb-4">{selectedTicket.name} - ${selectedTicket.price}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Tickets
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max="10"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={bookingData.quantity}
                    onChange={(e) => setBookingData({...bookingData, quantity: parseInt(e.target.value)})}
                  />
                </div>

                <div className="flex justify-between items-center mt-6">
                  <p className="text-lg font-bold">
                    Total: ${selectedTicket.price * bookingData.quantity}
                  </p>
                  <div className="space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
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