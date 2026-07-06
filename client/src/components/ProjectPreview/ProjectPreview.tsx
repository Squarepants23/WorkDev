function ProjectPreview() {
  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Featured Projects
        </h2>

        <p className="mt-4 text-gray-600">
          Beberapa project yang sedang dikembangkan oleh komunitas WorkDev.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-600">
            Dashboard Admin
          </h3>

          <p className="mt-4 text-gray-600">
            Dashboard modern menggunakan React, Express, dan MariaDB.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-600">
            Sistem Absensi
          </h3>

          <p className="mt-4 text-gray-600">
            Aplikasi absensi online dengan login dan dashboard admin.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-600">
            Portfolio Website
          </h3>

          <p className="mt-4 text-gray-600">
            Website portofolio modern untuk programmer dan freelancer.
          </p>
        </div>

      </div>
    </section>
  );
}

export default ProjectPreview;