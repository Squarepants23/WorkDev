import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMe } from "../services/authService";

type User = {
  fullName: string;
  username: string;
  email: string;
  role: string;
};

function DashboardPage() {
  const navigate = useNavigate();
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
      <h1 className="mb-6 text-3xl font-bold">Member Dashboard</h1>

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

        <div className="mt-6">
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            My Profile
          </button>

          <button
            onClick={() => navigate("/dashboard/projects")}
            className="rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white transition hover:bg-emerald-700"
          >
            My Projects
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
