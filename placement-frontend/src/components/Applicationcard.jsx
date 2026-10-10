
import React from "react";

const ApplicationCard = ({ application, onDelete }) => {
  if (!application) return null;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title fw-bold">
              {application.jobTitle || "Job Title Not Available"}
            </h5>

            <p className="mb-2">
              <strong>Company:</strong>{" "}
              {application.company || "Not specified"}
            </p>

            <p className="mb-2">
              <strong>Location:</strong>{" "}
              {application.location || "Not specified"}
            </p>

            <p className="mb-2">
              <strong>Applied Date:</strong>{" "}
              {application.appliedDate
                ? new Date(application.appliedDate).toLocaleDateString()
                : "Not available"}
            </p>

            <p className="mb-0">
              <strong>Status:</strong>{" "}
              <span className="badge bg-primary">
                {application.status || "APPLIED"}
              </span>
            </p>
          </div>

          {onDelete && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(application.id)}
            >
              Delete
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default ApplicationCard;

