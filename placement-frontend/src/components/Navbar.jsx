
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand fw-bold"
        >
          Placement Portal
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          {/* Left Side Links */}
          <ul className="navbar-nav me-auto">

            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link"
                  >
                    Home
                  </Link>
                </li>
              </>
            )}

            {/* Student Links */}
            {isAuthenticated &&
              user?.role === "ROLE_STUDENT" && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/student/dashboard"
                      className="nav-link"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/jobs"
                      className="nav-link"
                    >
                      Jobs
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/my-applications"
                      className="nav-link"
                    >
                      My Applications
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/student/profile"
                      className="nav-link"
                    >
                      Profile
                    </Link>
                  </li>
                </>
              )}

            {/* Admin Links */}
            {isAuthenticated &&
              user?.role === "ROLE_ADMIN" && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/admin/dashboard"
                      className="nav-link"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/admin/users"
                      className="nav-link"
                    >
                      Users
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/admin/jobs"
                      className="nav-link"
                    >
                      Jobs
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/admin/applications"
                      className="nav-link"
                    >
                      Applications
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/admin/skills"
                      className="nav-link"
                    >
                      Skills
                    </Link>
                  </li>
                </>
              )}

          </ul>

          {/* Right Side */}
          <ul className="navbar-nav">

            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Username */}
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link">
                    <i className="bx bx-user me-1"></i>
                    {user?.username}
                  </span>
                </li>

                {/* Logout */}
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-outline-light ms-lg-2 mt-2 mt-lg-0"
                    onClick={handleLogout}
                  >
                    <i className="bx bx-log-out me-1"></i>
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

