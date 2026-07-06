import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl md:hidden"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

        <div className="hidden gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-blue-600"
                : "transition hover:text-blue-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/members"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-blue-600"
                : "transition hover:text-blue-600"
            }
          >
            Members
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-blue-600"
                : "transition hover:text-blue-600"
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-blue-600"
                : "transition hover:text-blue-600"
            }
          >
            About
          </NavLink>
        </div>

        <div className="hidden md:block">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <Link to="/members" onClick={() => setIsOpen(false)}>
              Members
            </Link>

            <Link to="/projects" onClick={() => setIsOpen(false)}>
              Projects
            </Link>

            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>

            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;