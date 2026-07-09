import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMe } from "../services/authService";

interface User {
  fullName: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  linktree?: string;
  portfolio?: string;
  avatar?: string;
}

function MyProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl p-8">
        <h1 className="mb-8 text-3xl font-bold">My Profile</h1>

        <div className="rounded-xl border p-6 shadow">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">My Profile</h1>

      <div className="rounded-2xl border bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center">
          {user.avatar ? (
            <img
              src={`http://localhost:5000${user.avatar}`}
              alt="Avatar"
              className="mb-4 h-28 w-28 rounded-full border-4 border-blue-500 object-cover"
            />
          ) : (
            <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
              {user.fullName.charAt(0)}
            </div>
          )}

          <h2 className="text-2xl font-bold">{user.fullName}</h2>

          <p className="text-gray-500">@{user.username}</p>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <p className="font-semibold">Email</p>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div>
            <p className="font-semibold">Bio</p>
            <p className="text-gray-600">{user.bio || "Belum diisi"}</p>
          </div>

          <div>
            <p className="font-semibold">Lokasi</p>
            <p className="text-gray-600">{user.location || "Belum diisi"}</p>
          </div>

          <div>
            <p className="font-semibold">GitHub</p>
            <p className="text-gray-600">{user.github || "Belum diisi"}</p>
          </div>

          <div>
            <p className="font-semibold">LinkedIn</p>
            <p className="text-gray-600">{user.linkedin || "Belum diisi"}</p>
          </div>

          <div>
            <p className="font-semibold">Linktree</p>
            <p className="text-gray-600">{user.linktree || "Belum diisi"}</p>
          </div>

          <div>
            <p className="font-semibold">Portfolio</p>
            <p className="text-gray-600">{user.portfolio || "Belum diisi"}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard/profile/edit")}
          className="mt-10 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default MyProfilePage;
