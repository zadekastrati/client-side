import Header from '../components/header/page';
import Link from 'next/link';

export default function Products() {
  const events = [
    {
      id: 1,
      title: "Summer Music Festival",
      description: "Three days of amazing music and entertainment",
      price: "$199"
    },
    {
      id: 2,
      title: "Tech Conference 2024",
      description: "Latest innovations in technology",
      price: "$299"
    },
    {
      id: 3,
      title: "Food & Wine Festival",
      description: "Culinary delights from around the world",
      price: "$149"
    }
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-4xl font-bold mb-6">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-200">
              <h2 className="text-xl font-semibold mb-3">{event.title}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-blue-600 font-semibold mb-4">{event.price}</p>
              <Link 
                href={`/products/${event.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
} 