import { useEffect, useState } from "react";

import { getMe } from "../services/authService";

type User = {
  fullName: string;
  username: string;
  email: string;
  role: string;
};

function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <div className="space-y-3 rounded-xl border p-6">
        <h2 className="text-2xl font-semibold">Halo, {user.fullName}</h2>

        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
