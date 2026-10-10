import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../../services/applicationService";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error loading applications:", error);
      setError(
        error.response?.data?.message ||
          "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      await loadApplications();
    } catch (error) {
      console.error("Error updating application:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update application status."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteApplication(id);
      await loadApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
      setError(
        error.response?.data?.message ||
          "Failed to delete application."
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Manage Applications</h2>
          <p className="text-muted mb-0">
            View and manage student job applications.
          </p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {applications.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <i
              className="bx bx-file"
              style={{ fontSize: "60px" }}
            ></i>

            <h4 className="mt-3">
              No Applications Found
            </h4>

            <p className="text-muted">
              There are currently no job applications.
            </p>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">

            <div className="table-responsive">
              <table className="table table-hover align-middle">

                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>College</th>
                    <th>Course</th>
                    <th>Skills</th>
                    <th>Job</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id}>

                      {/* Application ID */}
                      <td>
                        {application.id}
                      </td>

                      {/* Student */}
                      <td>
                        {application.studentName ||
                          application.studentId ||
                          "N/A"}
                      </td>

                      {/* College */}
                      <td>
                        {application.college || "N/A"}
                      </td>

                      {/* Course */}
                      <td>
                        {application.course || "N/A"}
                      </td>

                      {/* Skills */}
                      <td>
                        {application.skills &&
                        application.skills.length > 0 ? (
                          <div className="d-flex flex-wrap gap-1">
                            {application.skills.map((skill) => (
                              <span
                                key={skill.id}
                                className="badge bg-primary"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted">
                            No skills
                          </span>
                        )}
                      </td>

                      {/* Job */}
                      <td>
                        <strong>
                          {application.jobTitle || "N/A"}
                        </strong>

                        {application.company && (
                          <div className="text-muted small">
                            {application.company}
                          </div>
                        )}

                        {application.location && (
                          <div className="text-muted small">
                            {application.location}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <select
                          className="form-select"
                          value={application.status}
                          onChange={(e) =>
                            handleStatusChange(
                              application.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="APPLIED">
                            APPLIED
                          </option>

                          <option value="SHORTLISTED">
                            SHORTLISTED
                          </option>

                          <option value="REJECTED">
                            REJECTED
                          </option>

                          <option value="SELECTED">
                            SELECTED
                          </option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="d-flex gap-2">

                          <Link
                            to={`/admin/applications/${application.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            View
                          </Link>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleDelete(application.id)
                            }
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageApplications;