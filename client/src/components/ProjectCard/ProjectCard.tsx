type ProjectCardProps = {
  title: string;
  description: string;
  status: string;
  techStack: string[];
};

function ProjectCard({
  title,
  description,
  status,
  techStack,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-gray-100 text-5xl">
        💻
      </div>

      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-2 text-gray-600">
        {description}
      </p>

      <span className="mt-4 inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
        {status}
      </span>

      <div className="mt-4 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700"
          >
            {tech}
          </span>
        ))}
      </div>

      <button className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700">
        View Project
      </button>
    </div>
  );
}

export default ProjectCard;