
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">

            <div className="col-lg-7">
              <h1 className="display-4 fw-bold mb-3">
                Placement Management System
              </h1>

              <p className="lead mb-4">
                Find placement opportunities, apply for jobs,
                and manage your applications in one place.
              </p>

              <div className="d-flex gap-3 flex-wrap">

                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/register"
                      className="btn btn-light btn-lg"
                    >
                      Get Started
                    </Link>

                    <Link
                      to="/login"
                      className="btn btn-outline-light btn-lg"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    {user?.role === "ROLE_ADMIN" ? (
                      <Link
                        to="/admin/dashboard"
                        className="btn btn-light btn-lg"
                      >
                        Admin Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/student/dashboard"
                        className="btn btn-light btn-lg"
                      >
                        Student Dashboard
                      </Link>
                    )}
                  </>
                )}

              </div>
            </div>

            <div className="col-lg-5 text-center mt-4 mt-lg-0">
              <i
                className="bx bx-briefcase-alt-2"
                style={{ fontSize: "180px" }}
              ></i>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Everything You Need
            </h2>

            <p className="text-muted">
              A simple platform for managing placement activities.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">

                  <i
                    className="bx bx-search-alt text-primary"
                    style={{ fontSize: "50px" }}
                  ></i>

                  <h4 className="fw-bold mt-3">
                    Find Jobs
                  </h4>

                  <p className="text-muted">
                    Explore available placement opportunities
                    from different companies.
                  </p>

                  <Link
                    to="/jobs"
                    className="btn btn-outline-primary"
                  >
                    Browse Jobs
                  </Link>

                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">

                  <i
                    className="bx bx-file text-primary"
                    style={{ fontSize: "50px" }}
                  ></i>

                  <h4 className="fw-bold mt-3">
                    Apply Easily
                  </h4>

                  <p className="text-muted">
                    Apply for suitable jobs and keep track
                    of your applications.
                  </p>

                  <Link
                    to="/jobs"
                    className="btn btn-outline-primary"
                  >
                    View Jobs
                  </Link>

                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">

                  <i
                    className="bx bx-user text-primary"
                    style={{ fontSize: "50px" }}
                  ></i>

                  <h4 className="fw-bold mt-3">
                    Manage Profile
                  </h4>

                  <p className="text-muted">
                    Keep your student profile updated with
                    your academic information and skills.
                  </p>

                  {!isAuthenticated ? (
                    <Link
                      to="/register"
                      className="btn btn-outline-primary"
                    >
                      Create Account
                    </Link>
                  ) : (
                    <Link
                      to={
                        user?.role === "ROLE_ADMIN"
                          ? "/admin/dashboard"
                          : "/student/profile"
                      }
                      className="btn btn-outline-primary"
                    >
                      My Profile
                    </Link>
                  )}

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call To Action */}
      {!isAuthenticated && (
        <section className="bg-light py-5">
          <div className="container text-center">

            <h2 className="fw-bold mb-3">
              Ready to Start?
            </h2>

            <p className="text-muted mb-4">
              Create your account and start exploring
              placement opportunities.
            </p>

            <Link
              to="/register"
              className="btn btn-primary btn-lg"
            >
              Register Now
            </Link>

          </div>
        </section>
      )}

    </div>
  );
};

export default Home;

