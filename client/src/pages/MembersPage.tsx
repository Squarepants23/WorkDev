import { useEffect, useState } from "react";
import api from "../api/axios";
import Container from "../components/Container/Container";
import MemberCard from "../components/MemberCard/MemberCard";

interface Member {
  _id: string;
  fullName: string;
  username: string;
  bio?: string;
  location?: string;
  role: string;
  avatar?: string;
}

function MembersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await api.get("/users");
        setMembers(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMembers();
  }, []);

  const filteredMembers = members.filter((member) => {
    const matchSearch = member.fullName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchRole = roleFilter === "All" || member.role === roleFilter;

    return matchSearch && matchRole;
  });

  return (
    <Container>
      <section className="py-16">
        <h1 className="mb-2 text-center text-4xl font-bold text-gray-900">
          Our Members
        </h1>

        <p className="mb-10 text-center text-gray-600">
          Kenali anggota komunitas WorkDev.
        </p>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
          />
        </div>

        <div className="mb-8 flex justify-center">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg border px-4 py-2"
          >
            <option value="All">All</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="UI/UX">UI/UX</option>
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member._id}
              id={member._id}
              name={member.fullName}
              username={member.username}
              role={member.role}
              bio={member.bio}
              location={member.location}
              avatar={member.avatar}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}

export default MembersPage;
