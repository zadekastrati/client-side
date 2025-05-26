'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/header/page';

export default function EventDetails() {
  const params = useParams();
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    ticketType: 'regular',
    quantity: 1,
    name: '',
    email: '',
    phone: ''
  });

  // This would typically come from an API call using the ID
  const eventDetails = {
    title: "Summer Music Festival 2024",
    date: "July 15-17, 2024",
    location: "Central Park, New York",
    price: "$199",
    description: "Join us for three days of amazing music featuring top artists from around the world. Experience unforgettable performances, great food, and create lasting memories.",
    highlights: [
      "Over 50 artists performing live",
      "Multiple stages with different genres",
      "Food courts with international cuisine",
      "VIP access available",
      "Camping facilities"
    ],
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ticketTypes: [
      { type: 'regular', price: 199, description: 'Regular admission for all three days' },
      { type: 'vip', price: 399, description: 'VIP access with exclusive areas and benefits' },
      { type: 'single-day', price: 89, description: 'Single day admission' }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission here
    console.log('Booking submitted:', bookingData);
    // You would typically send this to an API
    alert('Booking successful! Check your email for confirmation.');
    setShowBooking(false);
  };

  const selectedTicketType = eventDetails.ticketTypes.find(t => t.type === bookingData.ticketType);
  const totalPrice = selectedTicketType ? selectedTicketType.price * bookingData.quantity : 0;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Event Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{eventDetails.title}</h1>
            <p className="text-gray-600">Event ID: {params.id}</p>
          </div>

          {/* Event Image */}
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <img
              src={eventDetails.image}
              alt={eventDetails.title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Date & Time</h2>
              <p className="text-gray-600">{eventDetails.date}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <p className="text-gray-600">{eventDetails.location}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Starting From</h2>
              <p className="text-gray-600">{eventDetails.price}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
            <p className="text-gray-600 mb-6">{eventDetails.description}</p>
            
            <h3 className="text-xl font-semibold mb-3">Event Highlights</h3>
            <ul className="list-disc list-inside text-gray-600">
              {eventDetails.highlights.map((highlight, index) => (
                <li key={index} className="mb-2">{highlight}</li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button 
              onClick={() => setShowBooking(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Book Tickets
            </button>
          </div>
        </div>

        {/* Booking Modal */}
        {showBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Book Tickets</h2>
                <button 
                  onClick={() => setShowBooking(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ticket Type
                  </label>
                  <select
                    name="ticketType"
                    value={bookingData.ticketType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {eventDetails.ticketTypes.map((ticket) => (
                      <option key={ticket.type} value={ticket.type}>
                        {ticket.description} - ${ticket.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    max="10"
                    value={bookingData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={bookingData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={bookingData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Total Price:</span>
                    <span className="text-blue-600 font-bold">${totalPrice}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
} 