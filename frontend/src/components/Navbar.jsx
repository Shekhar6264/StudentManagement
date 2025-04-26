import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">
          🎓 Student Portal
        </h1>
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link
              to="/"
              className="hover:text-blue-200 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/students"
              className="hover:text-blue-200 transition duration-200"
            >
              Student List
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
