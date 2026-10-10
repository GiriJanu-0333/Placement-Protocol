import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const StudentDashboard = () => {

  const { user } = useAuth();

  return (
    <div className="container py-5">

      {/* Welcome Section */}

      <div className="mb-5">

        <h1 className="fw-bold">
          Welcome, {user?.username || "Student"} 👋
        </h1>

        <p className="text-muted">
          Manage your placement activities from your dashboard.
        </p>

      </div>


      {/* Dashboard Cards */}

      <div className="row g-4">

        {/* Browse Jobs */}

        <div className="col-md-4">

          <div className="card shadow-sm h-100">

            <div className="card-body text-center p-4">

              <i
                className="bx bx-briefcase text-primary"
                style={{ fontSize: "55px" }}
              ></i>

              <h4 className="mt-3">
                Browse Jobs
              </h4>

              <p className="text-muted">
                Explore available placement opportunities.
              </p>

              <Link
                to="/jobs"
                className="btn btn-primary"
              >
                View Jobs
              </Link>

            </div>

          </div>

        </div>


        {/* My Applications */}

        <div className="col-md-4">

          <div className="card shadow-sm h-100">

            <div className="card-body text-center p-4">

              <i
                className="bx bx-file text-success"
                style={{ fontSize: "55px" }}
              ></i>

              <h4 className="mt-3">
                My Applications
              </h4>

              <p className="text-muted">
                Track the status of your job applications.
              </p>

              <Link
                to="/my-applications"
                className="btn btn-success"
              >
                View Applications
              </Link>

            </div>

          </div>

        </div>


        {/* Profile */}

        <div className="col-md-4">

          <div className="card shadow-sm h-100">

            <div className="card-body text-center p-4">

              <i
                className="bx bx-user text-warning"
                style={{ fontSize: "55px" }}
              ></i>

              <h4 className="mt-3">
                My Profile
              </h4>

              <p className="text-muted">
                Manage your profile, skills and resume.
              </p>

              <Link
                to="/student/profile"
                className="btn btn-warning"
              >
                View Profile
              </Link>

            </div>

          </div>

        </div>


        {/* Skills */}

        <div className="col-md-4">

          <div className="card shadow-sm h-100">

            <div className="card-body text-center p-4">

              <i
                className="bx bx-code-alt text-info"
                style={{ fontSize: "55px" }}
              ></i>

              <h4 className="mt-3">
                Skills
              </h4>

              <p className="text-muted">
                Add and manage your skills.
              </p>

              <Link
                to="/student/skills"
                className="btn btn-info"
              >
                View Skills
              </Link>

            </div>

          </div>

        </div>

      </div>


      {/* Quick Actions */}

      <div className="card shadow-sm mt-5">

        <div className="card-body p-4">

          <h4 className="mb-4">
            Quick Actions
          </h4>

          <div className="d-flex flex-wrap gap-3">

            <Link
              to="/jobs"
              className="btn btn-outline-primary"
            >
              <i className="bx bx-search me-1"></i>
              Find Jobs
            </Link>


            <Link
              to="/my-applications"
              className="btn btn-outline-success"
            >
              <i className="bx bx-file me-1"></i>
              My Applications
            </Link>


            <Link
              to="/student/profile/edit"
              className="btn btn-outline-warning"
            >
              <i className="bx bx-edit me-1"></i>
              Edit Profile
            </Link>


            <Link
              to="/student/skills"
              className="btn btn-outline-info"
            >
              <i className="bx bx-code-alt me-1"></i>
              Manage Skills
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;