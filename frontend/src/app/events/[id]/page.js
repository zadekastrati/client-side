"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import Button from "../../components/button/page";

const DEFAULT_TICKETS = [
  {
    name: "Standard Ticket",
    price: 99,
    description: "Access to the event with standard seating.",
  },
  {
    name: "VIP Ticket",
    price: 199,
    description: "Includes premium seating and exclusive lounge access.",
  },
  {
    name: "Super VIP Ticket",
    price: 299,
    description: "All VIP benefits plus backstage passes and gifts.",
  },
];

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    quantity: 1,
  });

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/events/${id}`);
        const data = await res.json();
        if (data.success) setEvent(data.data);
        else setEvent(null);
      } catch {
        setEvent(null);
      }
    };
    fetchEvent();
  }, [id]);

  // Open booking modal with selected ticket or without ticket
  const handleBookNow = (ticket = null) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // Handle booking form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTicket) {
      alert("Please select a ticket type.");
      return;
    }
    console.log("Booking submitted:", {
      event: event?.name || "Unknown Event",
      ticket: selectedTicket,
      ...bookingData,
    });
    setIsModalOpen(false);
    setBookingData({ name: "", email: "", quantity: 1 });
    alert("Booking successful! Thank you.");
  };

  if (!event) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Loading event details...</h1>
        </main>
        <Footer />
      </>
    );
  }

  // Tickets to show — event tickets or fallback default tickets
  const ticketsToShow =
    event.tickets && event.tickets.length > 0 ? event.tickets : DEFAULT_TICKETS;

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-20">
        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="relative h-[400px]">
            <img
              src={event.photoUrl}
              alt={event.name}
              className="absolute w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
            <p className="text-lg text-gray-700 mb-6">{event.description}</p>
            <div className="space-y-4">
              <div className="flex items-center">
                📅{" "}
                <span className="ml-2 text-lg">
                  {event.date ? event.date.split("T")[0] : "TBA"}
                </span>
              </div>
              <div className="flex items-center">
                📍 <span className="ml-2 text-lg">{event.location || "TBA"}</span>
              </div>
              <div className="flex items-center">
                💵 <span className="ml-2 text-lg">${event.price || "N/A"}</span>
              </div>
            </div>
            <button
              onClick={() => handleBookNow(null)}
              className="mt-6 rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              Book a Ticket
            </button>
          </div>
        </div>

        {/* Ticket Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Ticket Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ticketsToShow.map((ticket, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{ticket.name}</h3>
                <p className="text-gray-600 mb-4">{ticket.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${ticket.price}</span>
                  <button
              onClick={() => handleBookNow(null)}
              className="mt-6 rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              Book a Ticket
            </button>
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
              {selectedTicket ? (
                <h3 className="text-xl mb-4">
                  {selectedTicket.name} - ${selectedTicket.price}
                </h3>
              ) : (
                <h3 className="text-xl mb-4 text-red-600">
                  Please select a ticket type
                </h3>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={bookingData.name}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={bookingData.email}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>

                <div className="flex justify-between items-center mt-6">
                  <p className="text-lg font-bold">
                    Total: $
                    {selectedTicket
                      ? selectedTicket.price * bookingData.quantity
                      : 0}
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
                      disabled={!selectedTicket}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
