type MemberCardProps = {
  name: string;
  role: string;
  level: string;
  skills: string[];
};

function MemberCard({
  name,
  role,
  level,
  skills,
}: MemberCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl">
          👤
        </div>
      </div>

      <h3 className="text-center text-xl font-bold">
        {name}
      </h3>

      <p className="mt-1 text-center text-gray-500">
        {role}
      </p>

      <span className="mt-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
        {level}
      </span>

    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
        >
          {skill}
        </span>
      ))}
    </div>

      <button className="mt-5 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
        View Profile
      </button>
    </div>
  );
}

export default MemberCard;