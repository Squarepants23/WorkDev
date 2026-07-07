import Container from "../components/Container/Container";
import Button from "../components/Button/Button";

function AboutPage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">
          About WorkDev
        </h1>

        <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-600">
          WorkDev adalah komunitas programmer yang dibangun untuk belajar,
          berkolaborasi, dan mengembangkan project nyata bersama. Kami percaya
          bahwa setiap developer dapat berkembang lebih cepat dengan berbagi
          ilmu dan pengalaman.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-blue-600">
              Our Vision
            </h2>

            <p className="text-gray-600">
              Menjadi komunitas developer yang aktif, produktif, dan saling
              mendukung dalam menciptakan karya digital yang bermanfaat.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-blue-600">
              Our Mission
            </h2>

            <ul className="space-y-3 text-gray-600">
              <li>• Belajar bersama.</li>
              <li>• Membangun project kolaboratif.</li>
              <li>• Berbagi pengalaman.</li>
              <li>• Mengembangkan skill developer.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button>Join Community</Button>
        </div>
      </section>
    </Container>
  );
}

export default AboutPage;