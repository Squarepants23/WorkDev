function MemberPreview() {
  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Our Members
        </h2>

        <p className="mt-4 text-gray-600">
          Kenali beberapa anggota WorkDev.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <div className="mb-4 h-20 w-20 rounded-full bg-blue-100"></div>

          <h3 className="text-xl font-semibold">Rifqi Faizal</h3>

          <p className="mt-2 text-gray-600">
            Frontend Developer
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <div className="mb-4 h-20 w-20 rounded-full bg-blue-100"></div>

          <h3 className="text-xl font-semibold">John Doe</h3>

          <p className="mt-2 text-gray-600">
            Backend Developer
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <div className="mb-4 h-20 w-20 rounded-full bg-blue-100"></div>

          <h3 className="text-xl font-semibold">Jane Smith</h3>

          <p className="mt-2 text-gray-600">
            UI/UX Designer
          </p>
        </div>

      </div>
    </section>
  );
}

export default MemberPreview;