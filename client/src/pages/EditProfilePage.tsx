import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMe, updateProfile, uploadAvatar } from "../services/authService";

function EditProfilePage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [developerRole, setDeveloperRole] = useState("Fullstack");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [linktree, setLinktree] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const user = await getMe();

      console.log(user);

      setFullName(user.fullName);
      setUsername(user.username);
      setBio(user.bio || "");
      setLocation(user.location || "");
      setDeveloperRole(user.developerRole || "Fullstack");
      setGithub(user.github || "");
      setLinkedin(user.linkedin || "");
      setLinktree(user.linktree || "");
      setPortfolio(user.portfolio || "");
      setPreview(user.avatar ? `http://localhost:5000${user.avatar}` : "");
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
        developerRole,
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

  function handleSelectAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(file);

    setPreview(URL.createObjectURL(file));
  }

  async function handleUploadAvatar() {
    if (!avatar) {
      alert("Silakan pilih foto terlebih dahulu.");
      return;
    }

    try {
      await uploadAvatar(avatar);

      alert("Foto profil berhasil diupload!");

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("Upload foto gagal.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Edit Profile</h1>
      <div className="mb-8 flex flex-col items-center">
        <img
          src={
            preview
              ? preview
              : "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(fullName || "User")
          }
          alt="Avatar"
          className="mb-4 h-32 w-32 rounded-full border-4 border-blue-500 object-cover"
        />

        <input type="file" accept="image/*" onChange={handleSelectAvatar} />

        <button
          onClick={handleUploadAvatar}
          className="mt-4 rounded-lg bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
        >
          Upload Foto
        </button>
      </div>

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
            <label className="mb-2 block font-medium">Developer Role</label>

            <select
              value={developerRole}
              onChange={(e) => setDeveloperRole(e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Mobile">Mobile</option>
              <option value="DevOps">DevOps</option>
              <option value="AI">AI</option>
              <option value="Game Developer">Game Developer</option>
            </select>
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
