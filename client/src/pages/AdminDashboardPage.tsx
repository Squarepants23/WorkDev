import { useEffect, useState } from "react";
import axios from "axios";

import Container from "../components/Container/Container";

interface DashboardStats {
  totalMembers: number;
  onlineNow: number;
  totalProjects: number;
}

interface User {
  _id: string;
  fullName: string;
  username: string;
  role: string;
  avatar: string;
  isOnline: boolean;
  lastActive: string;
}

interface Activity {
  _id: string;
  fullName: string;
  avatar: string;
  isOnline: boolean;
  lastActive: string;
}

function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    onlineNow: 0,
    totalProjects: 0,
  });

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
        );

        setStats(res.data);

        const userRes = await axios.get("http://localhost:5000/api/users");

        setUsers(userRes.data);

        const activityRes = await axios.get(
          "http://localhost:5000/api/activity",
        );

        setActivities(activityRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <Container>
      <section className="py-12">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>

        <p className="mt-2 text-gray-600">Selamat datang kembali, Admin.</p>

        {/* Statistics */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Members</p>

            <h2 className="mt-3 text-4xl font-bold">
              {loading ? "..." : stats.totalMembers}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Online Now</p>

            <h2 className="mt-3 text-4xl font-bold text-green-600">
              {loading ? "..." : stats.onlineNow}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Projects</p>

            <h2 className="mt-3 text-4xl font-bold text-blue-600">
              {loading ? "..." : stats.totalProjects}
            </h2>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>

          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity._id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      activity.avatar
                        ? `http://localhost:5000${activity.avatar}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            activity.fullName,
                          )}`
                    }
                    alt={activity.fullName}
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold">{activity.fullName}</p>

                    <p
                      className={`text-sm ${
                        activity.isOnline ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {activity.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  {new Date(activity.lastActive).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Member Management */}
        <div className="mt-10 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">Member Management</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">Avatar</th>

                  <th className="px-4 py-3 text-left">Name</th>

                  <th className="px-4 py-3 text-left">Username</th>

                  <th className="px-4 py-3 text-left">Role</th>

                  <th className="px-4 py-3 text-left">Status</th>

                  <th className="px-4 py-3 text-left">Last Active</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <img
                        src={
                          user.avatar
                            ? `http://localhost:5000${user.avatar}`
                            : "https://ui-avatars.com/api/?name=" +
                              encodeURIComponent(user.fullName)
                        }
                        alt={user.fullName}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </td>

                    <td className="px-4 py-4 font-medium">{user.fullName}</td>

                    <td className="px-4 py-4">@{user.username}</td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          user.isOnline
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.isOnline ? "Online" : "Offline"}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {new Date(user.lastActive).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default AdminDashboardPage;
