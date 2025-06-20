import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // wait for session

    if (!session) {
      router.push("/auth");
      return;
    }

    if (session.user.role !== "admin") {
      router.push("/unauthorized");
      return;
    }

    // Fetch users from your API
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data || []); 
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session, status, router]);

  if (loading) return <p>Loading users...</p>;

  return (
    <main className="max-w-4xl mx-auto mt-20 p-4">
      <h1 className="text-3xl font-bold mb-6">Registered Users</h1>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
            <li key={user._id || user.id} className="py-3 flex justify-between">
            <span>{user.name}</span>
            <span className="text-gray-500">{user.email}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
