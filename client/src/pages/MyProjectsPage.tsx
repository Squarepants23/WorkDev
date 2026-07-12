import { Link } from "react-router-dom";

import Container from "../components/Container/Container";
import Button from "../components/Button/Button";

function MyProjectsPage() {
  return (
    <Container>
      <section className="py-12">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              My Projects
            </h1>

            <p className="mt-2 text-gray-600">
              Kelola seluruh project yang kamu miliki di WorkDev.
            </p>
          </div>

          <Link to="/dashboard/projects/new">
            <Button>
              + Add Project
            </Button>
          </Link>

        </div>

        <div className="mt-10 rounded-2xl border bg-white p-12 text-center shadow-sm">

          <h2 className="text-2xl font-semibold text-gray-800">
            Belum ada project.
          </h2>

          <p className="mt-3 text-gray-500">
            Tambahkan project pertamamu agar dapat dilihat oleh seluruh member WorkDev.
          </p>

        </div>

      </section>
    </Container>
  );
}

export default MyProjectsPage;