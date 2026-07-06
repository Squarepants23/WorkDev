function FeatureSection() {
  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Why Join WorkDev?
        </h2>

        <p className="mt-4 text-gray-600">
          Bangun pengalaman, relasi, dan portofolio bersama komunitas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <h3 className="mb-4 text-2xl font-semibold text-blue-600">
            Belajar Bersama
          </h3>

          <p className="text-gray-600">
            Belajar web development, backend, frontend, dan teknologi terbaru
            bersama anggota komunitas.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <h3 className="mb-4 text-2xl font-semibold text-blue-600">
            Kolaborasi Project
          </h3>

          <p className="text-gray-600">
            Kerjakan project bersama untuk meningkatkan pengalaman dan teamwork.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <h3 className="mb-4 text-2xl font-semibold text-blue-600">
            Bangun Portofolio
          </h3>

          <p className="text-gray-600">
            Tampilkan hasil karya dan portofolio agar siap menghadapi dunia kerja.
          </p>
        </div>

      </div>
    </section>
  );
}

export default FeatureSection;