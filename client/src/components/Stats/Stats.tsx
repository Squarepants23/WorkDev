import { useEffect, useState } from "react";
import api from "../../api/axios";

function Stats() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalProjects: 0,
    onlineNow: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await api.get("/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStats();
  }, []);

  return (
    <section className="py-20">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-4xl font-bold text-blue-600">
            {stats.totalMembers}
          </h2>
          <p className="mt-2 text-gray-600">Members</p>
        </div>

        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-4xl font-bold text-blue-600">
            {stats.totalProjects}
          </h2>
          <p className="mt-2 text-gray-600">Projects</p>
        </div>

        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-4xl font-bold text-blue-600">
            {stats.onlineNow}
          </h2>
          <p className="mt-2 text-gray-600">Active Developers</p>
        </div>
      </div>
    </section>
  );
}

export default Stats;
