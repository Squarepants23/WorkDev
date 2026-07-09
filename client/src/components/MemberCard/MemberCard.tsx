import { useNavigate } from "react-router-dom";

type MemberCardProps = {
  id: string;
  name: string;
  username: string;
  role: string;
  bio?: string;
  location?: string;
  avatar?: string;
};

function MemberCard({
  id,
  name,
  username,
  role,
  bio,
  location,
  avatar,
}: MemberCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/members/${id}`)}
      className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-4 flex justify-center">
        <img
          src={
            avatar
              ? `http://localhost:5000${avatar}`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
          }
          alt={name}
          className="h-24 w-24 rounded-full border-4 border-blue-500 object-cover"
        />
      </div>

      <h3 className="text-center text-xl font-bold">
        {name}
      </h3>

      <p className="text-center text-gray-500">
        @{username}
      </p>

      <div className="mt-3 flex justify-center">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {role}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 text-center text-sm text-gray-600">
        {bio || "Belum ada bio."}
      </p>

      <p className="mt-3 text-center text-sm text-gray-500">
        📍 {location || "Belum diisi"}
      </p>

      <button
        className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
      >
        View Profile
      </button>
    </div>
  );
}

export default MemberCard;