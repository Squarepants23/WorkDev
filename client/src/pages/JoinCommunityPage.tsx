import Container from "../components/Container/Container";

function JoinCommunityPage() {
  return (
    <Container>
      <section className="mx-auto max-w-5xl py-16">
        <h1 className="mb-4 text-center text-5xl font-bold">Join WorkDev</h1>

        <p className="mx-auto mb-12 max-w-3xl text-center text-gray-600">
          Bergabunglah dengan komunitas developer WorkDev untuk belajar,
          berkolaborasi, dan membangun project bersama.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-8 shadow">
            <h2 className="mb-4 text-2xl font-bold">Kenapa Bergabung?</h2>

            <ul className="space-y-3 text-gray-700">
              <li>• Belajar bersama developer lain.</li>
              <li>• Kolaborasi membuat project.</li>
              <li>• Membangun portofolio.</li>
              <li>• Sharing ilmu.</li>
              <li>• Networking.</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-8 shadow">
            <h2 className="mb-4 text-2xl font-bold">Syarat Bergabung</h2>

            <ul className="space-y-3 text-gray-700">
              <li>• Memiliki akun WorkDev.</li>
              <li>• Bersikap sopan.</li>
              <li>• Tidak spam.</li>
              <li>• Menghargai anggota/member lain.</li>
              <li>• Semangat belajar.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border bg-white p-8 shadow">
          <h2 className="mb-4 text-center text-3xl font-bold">Benefit</h2>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border p-5">
              <h3 className="mt-3 font-semibold">Kolaborasi Project</h3>
            </div>

            <div className="rounded-xl border p-5">
              <h3 className="mt-3 font-semibold">Bangun Portofolio</h3>
            </div>

            <div className="rounded-xl border p-5">
              <h3 className="mt-3 font-semibold">Networking</h3>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Join Our Community
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* WhatsApp */}
            <div className="rounded-2xl border bg-white p-8 text-center shadow transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 text-6xl"></div>

              <h3 className="text-2xl font-bold">WhatsApp Community</h3>

              <p className="mt-3 text-gray-600">
                Bergabung dengan grup WhatsApp WorkDev untuk mendapatkan
                informasi, diskusi singkat, dan update komunitas.
              </p>

              <a
                href="https://chat.whatsapp.com/I0fZhwyP7y83C8nQG5qu3h?s=cl&p=a&ilr=1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Join WhatsApp
              </a>
            </div>

            {/* Discord */}
            <div className="rounded-2xl border bg-white p-8 text-center shadow transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 text-6xl"></div>

              <h3 className="text-2xl font-bold">Discord Community</h3>

              <p className="mt-3 text-gray-600">
                Diskusi coding, sharing project, voice chat, dan kolaborasi
                bersama member WorkDev di Discord.
              </p>

              <a
                href="https://discord.gg/dpBMvUASxv"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default JoinCommunityPage;
