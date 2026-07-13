import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import Container from "../components/Container/Container";
import Button from "../components/ui/Button";

function CreateProjectPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    status: "Draft",
    techStack: "",
    repositoryUrl: "",
    projectUrl: "",
  });
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState<File | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("status", form.status);
      formData.append("techStack", form.techStack);
      formData.append("repositoryUrl", form.repositoryUrl);
      formData.append("projectUrl", form.projectUrl);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await api.post("/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Project berhasil dipublikasikan!");

      navigate("/dashboard/projects");
    } catch (error) {
      console.error(error);

      alert("Gagal membuat project.");
    }
  }

  return (
    <Container>
      <section className="mx-auto max-w-4xl py-10">
        <h1 className="text-4xl font-bold">Add Project</h1>

        <p className="mt-2 mb-8 text-gray-600">
          Publikasikan project terbaikmu ke komunitas WorkDev.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border bg-white p-8 shadow-sm"
        >
          <div>
            <label className="mb-2 block font-semibold">Thumbnail</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Project Title</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Description</label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold">Category</label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              >
                <option>Draft</option>
                <option>Published</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-semibold">Tech Stack</label>

            <input
              type="text"
              name="techStack"
              placeholder="React, Node.js, MongoDB"
              value={form.techStack}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              GitHub Repository
            </label>

            <input
              type="text"
              name="repositoryUrl"
              value={form.repositoryUrl}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Live Demo / Website
            </label>

            <input
              type="text"
              name="projectUrl"
              value={form.projectUrl}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <Button type="submit">
            Publish Project
          </Button>
        </form>
      </section>
    </Container>
  );
}

export default CreateProjectPage;
