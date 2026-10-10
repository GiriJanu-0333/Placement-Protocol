
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5">

      {/* Welcome Section */}
      <div className="mb-5">
        <h1 className="fw-bold">
          Welcome, {user?.username || "Admin"} 👋
        </h1>

        <p className="text-muted">
          Manage the placement portal from your admin dashboard.
        </p>
      </div>


      {/* Admin Cards */}
      <div className="row g-4">

        {/* Manage Users */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center p-4">

              <i
                className="bx bx-group text-primary"
                style={{ fontSize: "55px" }}
              ></i>

              <h4 className="mt-3">
                Manage Users
              </h4>

              <p className="text-muted">
                View and manage students and users.
              </p>

              <Link
                to="/admin/users"
                className="btn btn-primary"
              >
                Manage Users
              </Link>

            </div>
          </div>
        </div>


        {/* Manage Jobs */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center p-4">

              <i
                className="bx bx-briefcase text-success"
                style={{ fontSize: "55px" }}
              ></i>

              <h4 className="mt-3">
                Manage Jobs
              </h4>

              <p className="text-muted">
                Add, update, close and delete job postings.
              </p>

              <Link
                to="/admin/jobs"
                className="btn btn-success"
              >
                Manage Jobs
              </Link>

            </div>
          </div>
        </div>


        {/* Applications */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center p-4">

              <i
                className="bx bx-file text-warning"
                style={{ fontSize: "55px" }}
              ></i>

              <h4 className="mt-3">
                Applications
              </h4>

              <p className="text-muted">
                Review and manage student applications.
              </p>

              <Link
                to="/admin/applications"
                className="btn btn-warning"
              >
                View Applications
              </Link>

            </div>
          </div>
        </div>


        {/* Manage Skills */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center p-4">

              <i
                className="bx bx-code-alt text-info"
                style={{ fontSize: "55px" }}
              ></i>

              <h4 className="mt-3">
                Manage Skills
              </h4>

              <p className="text-muted">
                Add, update and remove skills.
              </p>

              <Link
                to="/admin/skills"
                className="btn btn-info"
              >
                Manage Skills
              </Link>

            </div>
          </div>
        </div>


        {/* Add Job */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center p-4">

              <i
                className="bx bx-plus-circle text-primary"
                style={{ fontSize: "55px" }}
              ></i>

              <h4 className="mt-3">
                Add New Job
              </h4>

              <p className="text-muted">
                Create a new placement opportunity.
              </p>

              <Link
                to="/admin/jobs/add"
                className="btn btn-primary"
              >
                Add Job
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
              to="/admin/jobs/add"
              className="btn btn-outline-primary"
            >
              <i className="bx bx-plus me-1"></i>
              Add Job
            </Link>

            <Link
              to="/admin/jobs"
              className="btn btn-outline-success"
            >
              <i className="bx bx-briefcase me-1"></i>
              Manage Jobs
            </Link>

            <Link
              to="/admin/applications"
              className="btn btn-outline-warning"
            >
              <i className="bx bx-file me-1"></i>
              Applications
            </Link>

            <Link
              to="/admin/users"
              className="btn btn-outline-info"
            >
              <i className="bx bx-group me-1"></i>
              Users
            </Link>

          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;

