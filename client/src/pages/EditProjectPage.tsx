import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import Container from "../components/Container/Container";

function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [techStack, setTechStack] = useState("");
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await api.get(`/projects/${id}`);

        const project = response.data;

        setTitle(project.title);
        setDescription(project.description);
        setCategory(project.category);
        setStatus(project.status);
        setTechStack(project.techStack.join(", "));
        setRepositoryUrl(project.repositoryUrl);
        setProjectUrl(project.projectUrl);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProject();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.put(`/projects/${id}`, {
        title,
        description,
        category,
        status,
        techStack: techStack.split(",").map((item) => item.trim()),
        repositoryUrl,
        projectUrl,
      });

      alert("Project berhasil diperbarui.");

      navigate(`/projects/${id}`);
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui project.");
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-3xl py-16">
        <h1 className="mb-8 text-4xl font-bold">Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul Project"
            className="w-full rounded-lg border p-3"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi"
            rows={5}
            className="w-full rounded-lg border p-3"
          />

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full rounded-lg border p-3"
          />

          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Status"
            className="w-full rounded-lg border p-3"
          />

          <input
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="React, Express, MongoDB"
            className="w-full rounded-lg border p-3"
          />

          <input
            value={repositoryUrl}
            onChange={(e) => setRepositoryUrl(e.target.value)}
            placeholder="Repository URL"
            className="w-full rounded-lg border p-3"
          />

          <input
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            placeholder="Live Project URL"
            className="w-full rounded-lg border p-3"
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg border px-6 py-3"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default EditProjectPage;
