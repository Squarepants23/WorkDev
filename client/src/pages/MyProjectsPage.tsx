import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import Container from "../components/Container/Container";
import Button from "../components/Button/Button";

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  status: string;
  techStack: string[];
}

function MyProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await api.get("/projects/my");

        setProjects(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <Container>
      <section className="py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">My Projects</h1>

            <p className="mt-2 text-gray-600">
              Kelola semua project yang kamu buat.
            </p>
          </div>

          <Link to="/dashboard/projects/create">
            <Button>Add Project</Button>
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              Kamu belum memiliki project.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project._id}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <img
                  src={
                    project.thumbnail
                      ? `http://localhost:5000${project.thumbnail}`
                      : "https://placehold.co/600x300?text=No+Thumbnail"
                  }
                  alt={project.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold">
                    {project.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-gray-600">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                      {project.status}
                    </span>

                    <div className="flex gap-3">
                      <Link to={`/projects/${project._id}/edit`}>
                        <Button>Edit</Button>
                      </Link>

                      <button className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}

export default MyProjectPage;