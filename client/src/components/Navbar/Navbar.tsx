function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <div className="text-2xl font-bold text-blue-600">
          WorkDev
        </div>

        <div className="hidden gap-8 md:flex">
          <a href="/">Home</a>
          <a href="/members">Members</a>
          <a href="/projects">Projects</a>
          <a href="/about">About</a>
        </div>

        <a
          href="/login"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Login
        </a>

      </div>
    </nav>
  );
}

export default Navbar;