import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        
        <div>
          <Logo />
          <p className="mt-2 text-sm text-gray-500">
            Belajar, berkolaborasi, dan membangun project bersama.
          </p>
        </div>

        <div className="flex gap-6 text-gray-600">
          <Link to="/">Home</Link>
          <Link to="/members">Members</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
        </div>

        <p className="text-sm text-gray-500">
          © 2026 WorkDev. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;