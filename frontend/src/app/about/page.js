import Header from '../components/header/page';

export default function About() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <div className="max-w-3xl">
          <p className="text-lg mb-6">
            We are a dedicated team committed to providing the best products and services to our customers.
            With years of experience in the industry, we strive to exceed expectations and deliver excellence
            in everything we do.
          </p>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p>
              To provide innovative solutions and exceptional service while maintaining the highest standards
              of quality and customer satisfaction.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
            <ul className="list-disc list-inside">
              <li className="mb-2">Quality and Excellence</li>
              <li className="mb-2">Customer Satisfaction</li>
              <li className="mb-2">Innovation</li>
              <li>Integrity</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
} 