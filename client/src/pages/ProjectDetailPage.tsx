import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";
import Container from "../components/Container/Container";

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  category?: string;
  status?: string;
  techStack: string[];
  repositoryUrl?: string;
  projectUrl?: string;

  owner?: {
    _id: string;
    fullName: string;
    username: string;
    avatar?: string;
  };
}

function ProjectDetailPage() {
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <Container>
        <h1 className="py-20 text-center text-2xl">Loading...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-4xl py-16">
        <img
          src={`http://localhost:5000${project.thumbnail}`}
          alt={project.title}
          className="h-80 w-full rounded-2xl object-cover"
        />

        <h1 className="mt-8 text-4xl font-bold">{project.title}</h1>

        <p className="mt-4 text-gray-600">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 rounded-xl border p-6">
          <p>
            <strong>Status:</strong> {project.status || "-"}
          </p>

          <p className="mt-2">
            <strong>Category:</strong> {project.category || "-"}
          </p>

          <p className="mt-2">
            <strong>Owner:</strong> {project.owner?.fullName}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-gray-900 px-5 py-3 text-white"
            >
              Repository
            </a>
          )}

          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-blue-600 px-5 py-3 text-white"
            >
              Live Project
            </a>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ProjectDetailPage;
