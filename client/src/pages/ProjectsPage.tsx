import Container from "../components/Container/Container";
import ProjectCard from "../components/ProjectCard/ProjectCard";

function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "WorkDev Website",
      description: "Website komunitas programmer modern.",
      status: "Completed",
      techStack: ["React", "TypeScript", "Tailwind"],
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Aplikasi manajemen tugas berbasis web.",
      status: "Ongoing",
      techStack: ["React", "Node.js", "Express"],
    },
    {
      id: 3,
      title: "Portfolio Platform",
      description: "Platform portfolio untuk developer.",
      status: "Planning",
      techStack: ["Next.js", "Tailwind"],
    },
  ];

  return (
    <Container>
      <section className="py-16">
        <h1 className="mb-2 text-center text-4xl font-bold">
          Community Projects
        </h1>

        <p className="mb-10 text-center text-gray-600">
          Project yang sedang dan telah dikerjakan anggota WorkDev.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              status={project.status}
              techStack={project.techStack}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}

export default ProjectsPage;
