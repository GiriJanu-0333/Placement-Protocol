
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getJobById,
  updateJob,
} from "../../services/jobService";

import JobForm from "../../components/JobForm";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessages";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch job
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
          "Failed to load job."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  // Update job
  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      setError("");

      await updateJob(id, formData);

      navigate("/admin/jobs");
    } catch (err) {
      console.error("Error updating job:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update job."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Loading job..." />;
  }

  if (!job) {
    return (
      <div className="container py-5">
        <ErrorMessage
          message={error || "Job not found."}
        />
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="mb-4">
        <h1 className="fw-bold">Edit Job</h1>
        <p className="text-muted">
          Update the job details below.
        </p>
      </div>

      {error && (
        <div className="mb-3">
          <ErrorMessage message={error} />
        </div>
      )}

      <JobForm
        initialData={job}
        onSubmit={handleSubmit}
        loading={saving}
        buttonText="Update Job"
      />

    </div>
  );
};

export default EditJob;

