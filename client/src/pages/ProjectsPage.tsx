import { useEffect, useState } from "react";
import api from "../api/axios";

import Container from "../components/Container/Container";
import ProjectCard from "../components/ProjectCard/ProjectCard";

interface Project {
  _id: string;
  title: string;
  description: string;
  status?: string;
  techStack: string[];
  github?: string;
  demo?: string;
}

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <Container>
      <section className="py-16">
        <h1 className="mb-2 text-center text-4xl font-bold">
          Community Projects
        </h1>

        <p className="mb-10 text-center text-gray-600">
          Project yang sedang dan telah dikerjakan anggota WorkDev.
        </p>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed py-16 text-center">
            <h2 className="text-2xl font-bold">Belum ada project.</h2>

            <p className="mt-3 text-gray-500">
              Jadilah member pertama yang membagikan project di WorkDev
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                description={project.description}
                status={project.status ?? "Completed"}
                techStack={project.techStack}
              />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}

export default ProjectsPage;
