export default function Unauthorized() {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg">You do not have permission to view this page.</p>
        <a href="/" className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Go to Home
        </a>
      </main>
    );
  }
  