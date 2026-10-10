
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getJobById } from "../../services/jobService";
import { applyForJob } from "../../services/applicationService";
import { getProfileByUserId } from "../../services/profileService";
import { useAuth } from "../../Context/AuthContext";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessages";

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getJobById(id);

        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Fetch student profile
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        if (!user?.id) return;

        const data = await getProfileByUserId(user.id);

        setProfile(data);
      } catch (err) {
        console.error("Error fetching student profile:", err);

        if (err.response?.status === 404) {
          setProfile(null);
        }
      }
    };

    fetchStudentProfile();
  }, [user]);

  // Apply for job
  const handleApply = async () => {
    if (!user?.id) {
      setError("User information not available.");
      return;
    }

    if (!profile) {
      setError(
        "Student profile not found. Please create your profile first."
      );
      return;
    }

    try {
      setApplying(true);
      setError("");
      setSuccess("");

      console.log("Applying with User ID:", user.id);
      console.log("Applying for Job ID:", job.id);

      await applyForJob(user.id, job.id);

      setSuccess("Application submitted successfully.");
    } catch (err) {
      console.error("Application error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to apply for this job."
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <Loading message="Loading job details..." />;
  }

  if (error && !job) {
    return (
      <div className="container py-5">
        <ErrorMessage message={error} />

        <Link
          to="/jobs"
          className="btn btn-secondary mt-3"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container py-5">
        <div className="alert alert-info">
          Job not found.
        </div>

        <Link
          to="/jobs"
          className="btn btn-secondary"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <Link
        to="/jobs"
        className="btn btn-outline-secondary mb-4"
      >
        ← Back to Jobs
      </Link>

      <div className="card shadow-sm">
        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-start mb-3">

            <div>
              <h1 className="fw-bold">
                {job.title}
              </h1>

              <h5 className="text-muted">
                {job.company}
              </h5>
            </div>

            {job.active !== undefined && (
              <span
                className={`badge ${
                  job.active
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {job.active ? "Active" : "Closed"}
              </span>
            )}

          </div>

          <hr />

          <div className="mb-3">
            <strong>Location:</strong>
            <p>
              {job.jobLocation || "Not specified"}
            </p>
          </div>

          <div className="mb-3">
            <strong>Description:</strong>
            <p>
              {job.description ||
                "No description available."}
            </p>
          </div>

          {job.skillsRequired && (
            <div className="mb-3">
              <strong>Required Skills:</strong>
              <p>{job.skillsRequired}</p>
            </div>
          )}

          {job.salary && (
            <div className="mb-3">
              <strong>Salary:</strong>
              <p>{job.salary}</p>
            </div>
          )}

          {job.deadline && (
            <div className="mb-3">
              <strong>Application Deadline:</strong>

              <p>
                {new Date(
                  job.deadline
                ).toLocaleDateString()}
              </p>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          {error && job && (
            <ErrorMessage message={error} />
          )}

          <div className="mt-4">

            <button
              className="btn btn-primary"
              onClick={handleApply}
              disabled={
                applying || !!success
              }
            >
              {applying
                ? "Applying..."
                : "Apply Now"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetails;

