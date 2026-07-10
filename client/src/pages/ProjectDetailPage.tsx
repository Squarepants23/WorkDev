import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

interface Comment {
  _id: string;
  content: string;
  createdAt: string;

  user: {
    _id: string;
    fullName: string;
    username: string;
    avatar?: string;
  };
}

function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [currentUserId, setCurrentUserId] = useState("");

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);

        const me = await api.get("/auth/me");
        setCurrentUserId(me.data._id);
        const likeResponse = await api.get(`/projects/${id}/likes`);

        setLikeCount(likeResponse.data.likeCount);
        setIsLiked(likeResponse.data.isLiked);
        const commentResponse = await api.get(`/projects/${id}/comments`);

        setComments(commentResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProject();
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus project ini?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/projects/${id}`);

      alert("Project berhasil dihapus.");

      navigate("/projects");
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus project.");
    }
  }

  async function handleLike() {
    try {
      const response = await api.post(`/projects/${id}/like`);

      setIsLiked(response.data.liked);

      if (response.data.liked) {
        setLikeCount((prev) => prev + 1);
      } else {
        setLikeCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleComment() {
    if (!comment.trim()) return;

    try {
      await api.post(`/projects/${id}/comments`, {
        content: comment,
      });

      const response = await api.get(`/projects/${id}/comments`);

      setComments(response.data);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  }

  const isOwner = project?.owner?._id === currentUserId;

  console.log("Current User ID:", currentUserId);
  console.log("Owner ID:", project?.owner?._id);
  console.log("Is Owner:", project?.owner?._id === currentUserId);

  if (!project) {
    return (
      <Container>
        <h1 className="py-20 text-center text-2xl">Loading...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-6xl py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <img
              src={
                project.thumbnail
                  ? `http://localhost:5000${project.thumbnail}`
                  : "https://placehold.co/1200x600?text=No+Thumbnail"
              }
              alt={project.title}
              className="h-80 w-full rounded-2xl object-cover shadow"
            />

            <h1 className="mt-8 text-4xl font-bold">{project.title}</h1>

            <p className="mt-4 leading-7 text-gray-600">
              {project.description}
            </p>

            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold">Tech Stack</h2>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`rounded-lg border px-5 py-3 font-medium transition ${
                  isLiked
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {isLiked ? "Unlike" : "Like"}
              </button>

              <p className="text-gray-600">
                {likeCount} {likeCount === 1 ? "Like" : "Likes"}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="mb-4 text-2xl font-semibold">Comments</h2>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 rounded-lg border p-3"
                />

                <button
                  onClick={handleComment}
                  className="rounded-lg bg-blue-600 px-5 text-white transition hover:bg-blue-700"
                >
                  Send
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {comments.map((item) => (
                  <div key={item._id} className="rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.user.avatar
                            ? `http://localhost:5000${item.user.avatar}`
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user.fullName)}`
                        }
                        alt={item.user.fullName}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div>
                        <h4 className="font-semibold">{item.user.fullName}</h4>

                        <p className="text-sm text-gray-500">
                          @{item.user.username}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-gray-700">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-semibold">
                Project Information
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>

                  <p className="font-medium">{project.status || "-"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Category</p>

                  <p className="font-medium">{project.category || "-"}</p>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h3 className="mb-4 text-lg font-semibold">Owner</h3>

                <div
                  onClick={() => navigate(`/members/${project.owner?._id}`)}
                  className="flex cursor-pointer items-center gap-4 rounded-lg transition hover:bg-gray-50 p-2"
                >
                  <img
                    src={
                      project.owner?.avatar
                        ? `http://localhost:5000${project.owner.avatar}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            project.owner?.fullName || "User",
                          )}`
                    }
                    alt={project.owner?.fullName}
                    className="h-16 w-16 rounded-full border object-cover"
                  />

                  <div>
                    <h4 className="font-semibold">{project.owner?.fullName}</h4>

                    <p className="text-sm text-gray-500">
                      @{project.owner?.username}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100"
                  >
                    Repository
                  </a>
                )}

                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                  >
                    Live Project
                  </a>
                )}
              </div>

              {isOwner && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate(`/projects/${project._id}/edit`)}
                    className="rounded-lg border border-blue-600 px-5 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
                  >
                    Edit Project
                  </button>

                  <button
                    onClick={handleDelete}
                    className="rounded-lg border border-red-600 px-5 py-3 font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ProjectDetailPage;
