
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  if (!job) {
    return null;
  }

  return (
    <div className="card h-100 shadow-sm">

      <div className="card-body d-flex flex-column">

        {/* Job Title */}
        <h5 className="card-title fw-bold">
          {job.title || "Job Title"}
        </h5>

        {/* Company */}
        <p className="mb-2">
          <i className="bx bx-buildings me-2 text-primary"></i>
          <strong>Company:</strong>{" "}
          {job.company || "Not specified"}
        </p>

        {/* Location */}
        <p className="mb-2">
          <i className="bx bx-map me-2 text-danger"></i>
          <strong>Location:</strong>{" "}
          {job.location || "Not specified"}
        </p>

        {/* Description */}
        <p className="text-muted mb-3">
          {job.description
            ? job.description.length > 120
              ? `${job.description.substring(0, 120)}...`
              : job.description
            : "No description available."}
        </p>

        {/* Salary */}
        {job.salary && (
          <p className="mb-2">
            <i className="bx bx-money me-2 text-success"></i>
            <strong>Salary:</strong>{" "}
            {job.salary}
          </p>
        )}

        {/* Skills */}
        {job.skillsRequired && (
          <p className="mb-3">
            <i className="bx bx-code-alt me-2 text-info"></i>
            <strong>Skills:</strong>{" "}
            {job.skillsRequired}
          </p>
        )}

        {/* Button */}
        <div className="mt-auto">
          <Link
            to={`/jobs/${job.id}`}
            className="btn btn-primary w-100"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
};

export default JobCard;

