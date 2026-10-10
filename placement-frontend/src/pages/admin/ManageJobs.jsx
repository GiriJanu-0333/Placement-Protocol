
import { useEffect, useState } from "react";
import {
  getAllJobs,
  deleteJob,
  closeJob,
} from "../../services/jobService";
import { Link } from "react-router-dom";

import JobCard from "../../components/JobCard";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessages";
import ConfirmDialog from "../../components/ConfirmDialog";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [confirmAction, setConfirmAction] = useState("");

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllJobs();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(
        err.response?.data?.message || "Failed to load jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Open confirmation dialog
  const handleConfirmClick = (jobId, action) => {
    setSelectedJobId(jobId);
    setConfirmAction(action);
    setShowConfirm(true);
  };

  // Delete job
  const handleDelete = async () => {
    try {
      setError("");

      await deleteJob(selectedJobId);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== selectedJobId)
      );
    } catch (err) {
      console.error("Error deleting job:", err);
      setError(
        err.response?.data?.message || "Failed to delete job."
      );
    } finally {
      setShowConfirm(false);
      setSelectedJobId(null);
      setConfirmAction("");
    }
  };

  // Close job
  const handleClose = async () => {
    try {
      setError("");

      const updatedJob = await closeJob(selectedJobId);

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === selectedJobId ? updatedJob : job
        )
      );
    } catch (err) {
      console.error("Error closing job:", err);
      setError(
        err.response?.data?.message || "Failed to close job."
      );
    } finally {
      setShowConfirm(false);
      setSelectedJobId(null);
      setConfirmAction("");
    }
  };

  // Confirm action
  const handleConfirm = () => {
    if (confirmAction === "delete") {
      handleDelete();
    } else if (confirmAction === "close") {
      handleClose();
    }
  };

  if (loading) {
    return <Loading message="Loading jobs..." />;
  }

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Manage Jobs</h1>
          <p className="text-muted">
            Add, edit, close and delete placement jobs.
          </p>
        </div>

        <Link
          to="/admin/jobs/add"
          className="btn btn-primary"
        >
          <i className="bx bx-plus me-1"></i>
          Add Job
        </Link>
      </div>

      {/* Error */}
      {error && <ErrorMessage message={error} />}

      {/* No jobs */}
      {jobs.length === 0 && (
        <div className="alert alert-info">
          No jobs found.
        </div>
      )}

      {/* Jobs */}
      {jobs.length > 0 && (
        <div className="row g-4">
          {jobs.map((job) => (
            <div
              className="col-md-6 col-lg-4"
              key={job.id}
            >
              <JobCard job={job} />

              <div className="card mt-2 shadow-sm">
                <div className="card-body d-flex gap-2">

                  {/* Edit */}
                  <Link
                    to={`/admin/jobs/edit/${job.id}`}
                    className="btn btn-warning flex-fill"
                  >
                    <i className="bx bx-edit-alt me-1"></i>
                    Edit
                  </Link>

                  {/* Close */}
                  {job.active !== false && (
                    <button
                      className="btn btn-secondary flex-fill"
                      onClick={() =>
                        handleConfirmClick(job.id, "close")
                      }
                    >
                      <i className="bx bx-x-circle me-1"></i>
                      Close
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    className="btn btn-danger flex-fill"
                    onClick={() =>
                      handleConfirmClick(job.id, "delete")
                    }
                  >
                    <i className="bx bx-trash me-1"></i>
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        show={showConfirm}
        title={
          confirmAction === "delete"
            ? "Delete Job"
            : "Close Job"
        }
        message={
          confirmAction === "delete"
            ? "Are you sure you want to delete this job?"
            : "Are you sure you want to close this job?"
        }
        confirmText={
          confirmAction === "delete"
            ? "Delete"
            : "Close Job"
        }
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedJobId(null);
          setConfirmAction("");
        }}
      />

    </div>
  );
};

export default ManageJobs;

