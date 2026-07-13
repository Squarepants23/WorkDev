import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX, HiCog } from "react-icons/hi";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { getMe } from "../../services/authService";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const isLoggedIn = !!token;
  useEffect(() => {
    async function fetchUser() {
      if (!token) return;

      try {
        const user = await getMe();

        if (user.avatar) {
          setAvatar(`http://localhost:5000${user.avatar}`);
        }

        setRole(user.role);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, [token]);

  function handleLogout() {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");

    if (!confirmLogout) {
      return;
    }

    localStorage.removeItem("token");

    navigate("/login");

    window.location.reload();
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
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

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard/profile">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full border-2 border-blue-500 object-cover cursor-pointer"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    U
                  </div>
                )}
              </Link>

              <Link to="/settings">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:scale-105 hover:bg-blue-50 hover:text-blue-600"
                  title="Settings"
                >
                  <HiCog className="text-xl" />
                </button>
              </Link>

              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>

              {role === "admin" && (
                <Link to="/admin/dashboard">
                  <Button>Admin</Button>
                </Link>
              )}

              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>

              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
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

            {isLoggedIn ? (
              <>
                <Link to="/dashboard/profile">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="h-10 w-10 rounded-full border-2 border-blue-500 object-cover transition hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      U
                    </div>
                  )}
                </Link>

                <Link to="/settings" onClick={() => setIsOpen(false)}>
                  <Button>⚙️ Settings</Button>
                </Link>

                <Link to="/dashboard">
                  <Button>Dashboard</Button>
                </Link>

                {role === "admin" && (
                  <Link to="/admin/dashboard">
                    <Button>Admin</Button>
                  </Link>
                )}

                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button>Login</Button>
                </Link>

                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
