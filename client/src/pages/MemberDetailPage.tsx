import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Container from "../components/Container/Container";

interface Member {
  _id: string;
  fullName: string;
  username: string;
  bio?: string;
  location?: string;
  role: string;
  avatar?: string;
  github?: string;
  linkedin?: string;
  linktree?: string;
  portfolio?: string;
}

function MemberDetailPage() {
  const { id } = useParams();

  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    async function fetchMember() {
      try {
        const response = await api.get(`/users/${id}`);
        setMember(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMember();
  }, [id]);

  if (!member) {
    return (
      <Container>
        <h1 className="py-20 text-center text-2xl">Loading...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-3xl py-16">
        <div className="flex flex-col items-center">
          <img
            src={
              member.avatar
                ? `http://localhost:5000${member.avatar}`
                : "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(member.fullName)
            }
            alt={member.fullName}
            className="h-36 w-36 rounded-full border-4 border-blue-500 object-cover"
          />

          <h1 className="mt-6 text-4xl font-bold">{member.fullName}</h1>

          <p className="text-gray-500">@{member.username}</p>

          <span className="mt-3 rounded-full bg-blue-100 px-4 py-2 text-blue-700">
            {member.role}
          </span>
        </div>

        <div className="mt-10 space-y-6 rounded-2xl border bg-white p-8 shadow">
          <div>
            <h2 className="font-semibold">Bio</h2>
            <p>{member.bio || "Belum ada bio."}</p>
          </div>

          <div>
            <h2 className="font-semibold">Lokasi</h2>
            <p>{member.location || "-"}</p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold">Social Media</h2>

          <div className="mt-2 space-y-2">
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                GitHub
              </a>
            )}

            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}

            {member.linktree && (
              <a
                href={member.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                Linktree
              </a>
            )}

            {member.portfolio && (
              <a
                href={member.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                Portfolio
              </a>
            )}

            {!member.github &&
              !member.linkedin &&
              !member.linktree &&
              !member.portfolio && (
                <p className="text-gray-500">Belum ada social media.</p>
              )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MemberDetailPage;
