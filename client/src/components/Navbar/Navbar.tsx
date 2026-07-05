import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <div className="hidden gap-8 md:flex">
          <Link to="/">Home</Link>
          <Link to="/members">Members</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
        </div>

        <Link
          to="/login"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
