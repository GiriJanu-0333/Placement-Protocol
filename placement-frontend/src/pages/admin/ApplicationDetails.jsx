import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../../services/applicationService";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessages";
import ConfirmDialog from "../../components/ConfirmDialog";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  // Fetch application
  const fetchApplication = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getApplicationById(id);

      console.log("APPLICATION DETAILS RESPONSE:", data);

      setApplication(data);
      setStatus(data.status || "APPLIED");
    } catch (err) {
      console.error("Error fetching application:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load application."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  // Update status
  const handleStatusUpdate = async () => {
    try {
      setSaving(true);
      setError("");

      const updatedApplication =
        await updateApplicationStatus(id, status);

      setApplication(updatedApplication);
    } catch (err) {
      console.error("Error updating application status:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update application status."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete application
  const handleDelete = async () => {
    try {
      setError("");

      await deleteApplication(id);

      setShowConfirm(false);
      navigate("/admin/applications");
    } catch (err) {
      console.error("Error deleting application:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete application."
      );

      setShowConfirm(false);
    }
  };

  if (loading) {
    return <Loading message="Loading application..." />;
  }

  if (!application) {
    return (
      <div className="container py-5">
        <ErrorMessage
          message={error || "Application not found."}
        />
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">
            Application Details
          </h1>

          <p className="text-muted mb-0">
            Application ID: {application.id}
          </p>
        </div>

        <Link
          to="/admin/applications"
          className="btn btn-outline-secondary"
        >
          <i className="bx bx-arrow-back me-1"></i>
          Back
        </Link>
      </div>

      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="row g-4">

        {/* Student Details */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">

              <h4 className="fw-bold mb-4">
                Student Details
              </h4>

              <p>
                <strong>ID:</strong>{" "}
                {application.studentId || "N/A"}
              </p>

              <p>
                <strong>Username:</strong>{" "}
                {application.username || "N/A"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {application.email || "N/A"}
              </p>

              <p>
                <strong>Full Name:</strong>{" "}
                {application.studentName || "N/A"}
              </p>

              <p>
                <strong>College:</strong>{" "}
                {application.college || "N/A"}
              </p>

              <p>
                <strong>Course:</strong>{" "}
                {application.course || "N/A"}
              </p>

              <p>
                <strong>Graduation Year:</strong>{" "}
                {application.graduationYear || "N/A"}
              </p>

            </div>
          </div>
        </div>


        {/* Job Details */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">

              <h4 className="fw-bold mb-4">
                Job Details
              </h4>

              <p>
                <strong>ID:</strong>{" "}
                {application.jobId || "N/A"}
              </p>

              <p>
                <strong>Title:</strong>{" "}
                {application.jobTitle || "N/A"}
              </p>

              <p>
                <strong>Company:</strong>{" "}
                {application.company || "N/A"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {application.location || "N/A"}
              </p>

            </div>
          </div>
        </div>


        {/* Student Skills */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">

              <h4 className="fw-bold mb-4">
                Student Skills
              </h4>

              {application.skills &&
              application.skills.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {application.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="badge bg-primary fs-6"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">
                  No skills added by the student.
                </p>
              )}

            </div>
          </div>
        </div>


        {/* Application Status */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">

              <h4 className="fw-bold mb-4">
                Application Status
              </h4>

              <div className="row align-items-end g-3">

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Status
                  </label>

                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
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
                </div>

                <div className="col-md-3">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleStatusUpdate}
                    disabled={
                      saving ||
                      status === application.status
                    }
                  >
                    {saving
                      ? "Updating..."
                      : "Update Status"}
                  </button>
                </div>

                <div className="col-md-3">
                  <button
                    className="btn btn-danger w-100"
                    onClick={() =>
                      setShowConfirm(true)
                    }
                  >
                    <i className="bx bx-trash me-1"></i>
                    Delete
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        show={showConfirm}
        title="Delete Application"
        message="Are you sure you want to delete this application?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() =>
          setShowConfirm(false)
        }
      />

    </div>
  );
};

export default ApplicationDetails;