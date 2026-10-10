
import { useEffect, useState } from "react";
import { getActiveJobs } from "../../services/jobService";
import JobCard from "../../components/JobCard";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessages";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getActiveJobs();

      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load jobs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="fw-bold">Available Jobs</h1>
        <p className="text-muted">
          Explore available placement opportunities.
        </p>
      </div>

      {/* Loading */}
      {loading && <Loading message="Loading jobs..." />}

      {/* Error */}
      {!loading && error && (
        <ErrorMessage message={error} />
      )}

      {/* No Jobs */}
      {!loading && !error && jobs.length === 0 && (
        <div className="alert alert-info">
          No active jobs are currently available.
        </div>
      )}

      {/* Jobs */}
      {!loading && !error && jobs.length > 0 && (
        <div className="row g-4">
          {jobs.map((job) => (
            <div
              className="col-md-6 col-lg-4"
              key={job.id}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;

