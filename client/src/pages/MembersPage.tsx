import Container from "../components/Container/Container";
import MemberCard from "../components/MemberCard/MemberCard";

function MembersPage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="mb-2 text-center text-4xl font-bold text-gray-900">
          Our Members
        </h1>

        <p className="mb-10 text-center text-gray-600">
          Kenali anggota komunitas WorkDev.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MemberCard
            name="Rifqi Faizal"
            role="Frontend Developer"
            level="Intermediate"
            skills={["React", "TypeScript", "Tailwind"]}
          />

          <MemberCard
            name="John Doe"
            role="Backend Developer"
            level="Beginner"
            skills={["Node.js", "Express", "MongoDB"]}
          />

          <MemberCard
            name="Jane Smith"
            role="UI/UX Designer"
            level="Expert"
            skills={["Figma", "UI Design", "UX Research"]}
          />
        </div>
      </section>
    </Container>
  );
}

export default MembersPage;