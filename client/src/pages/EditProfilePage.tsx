import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMe, updateProfile } from "../services/authService";

function EditProfilePage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [linktree, setLinktree] = useState("");
  const [portfolio, setPortfolio] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const user = await getMe();

      setFullName(user.fullName);
      setUsername(user.username);
      setBio(user.bio || "");
      setLocation(user.location || "");
      setGithub(user.github || "");
      setLinkedin(user.linkedin || "");
      setLinktree(user.linktree || "");
      setPortfolio(user.portfolio || "");
    }

    fetchUser();
  }, []);

  async function handleSubmit() {
    try {
      await updateProfile({
        fullName,
        username,
        bio,
        location,
        github,
        linkedin,
        linktree,
        portfolio,
      });

      alert("Profile berhasil diperbarui!");

      navigate("/dashboard/profile");
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui profile.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Edit Profile</h1>

      <div className="rounded-2xl border bg-white p-8 shadow-lg">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">Nama Lengkap</label>

            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Username</label>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Bio</label>

            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Lokasi</label>

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">GitHub</label>

            <input
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">LinkedIn</label>

            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Linktree</label>

            <input
              value={linktree}
              onChange={(e) => setLinktree(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Portfolio</label>

            <input
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
