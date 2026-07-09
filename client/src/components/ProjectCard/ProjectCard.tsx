import { useNavigate } from "react-router-dom";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  status: string;
  techStack: string[];
  thumbnail?: string;
};

function ProjectCard({
  id,
  title,
  description,
  status,
  techStack,
  thumbnail,
}: ProjectCardProps) {
  const navigate = useNavigate();

  console.log("Project ID:", id);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 overflow-hidden rounded-lg">
        {thumbnail ? (
          <img
            src={`http://localhost:5000${thumbnail}`}
            alt={title}
            className="h-40 w-full object-cover"
          />
        ) : (
          <div className="flex h-40 items-center justify-center bg-gray-100 text-5xl">
            💻
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-2 text-gray-600">{description}</p>

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

      <button
        onClick={() => {
          console.log("ID =", id);
          navigate(`/projects/${id}`);
        }}
        className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
      >
        View Project
      </button>
    </div>
  );
}

export default ProjectCard;
