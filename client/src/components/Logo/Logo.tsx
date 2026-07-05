import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="text-2xl font-bold text-blue-600 transition hover:text-blue-700"
    >
      WorkDev
    </Link>
  );
}

export default Logo;
