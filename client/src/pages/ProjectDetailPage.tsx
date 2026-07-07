import { useParams } from "react-router-dom";
import Container from "../components/Container/Container";

function ProjectDetailPage() {
  const { id } = useParams();

  return (
    <Container>
      <section className="py-16">
        <h1 className="text-4xl font-bold">Project #{id}</h1>

        <p className="mt-4 text-gray-600">
          Ini adalah halaman detail project dengan ID {id}.
        </p>
      </section>
    </Container>
  );
}

export default ProjectDetailPage;
