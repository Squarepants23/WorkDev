import { Link } from "react-router-dom";
import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import Stats from "../components/Stats/Stats";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import MemberPreview from "../components/MemberPreview/MemberPreview";
import TechnologyStack from "../components/TechnologyStack/TechnologyStack";
import ProjectPreview from "../components/ProjectPreview/ProjectPreview";

function HomePage() {
  return (
    <Container>
      <section className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
          Welcome to Coding Community
        </p>

        <h1 className="mb-6 text-5xl font-bold text-gray-900">WorkDev</h1>

        <p className="mb-8 max-w-2xl text-lg text-gray-600">
          Komunitas coding untuk belajar, berkolaborasi, dan membangun project
          bersama. Semua anggota dapat saling mengenal, berbagi pengalaman, dan
          mengembangkan karya secara terbuka.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/members">
            <Button>Explore Members</Button>
          </Link>

          <Link to="/projects">
            <button className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100">
              View Projects
            </button>
          </Link>
        </div>
      </section>

      <Stats />

      <FeatureSection />

      <MemberPreview />

      <TechnologyStack />

      <ProjectPreview />
    </Container>
  );
}

export default HomePage;
