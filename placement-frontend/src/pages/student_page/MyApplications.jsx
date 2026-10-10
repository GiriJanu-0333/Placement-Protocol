
import { useEffect, useState } from "react";
import {
  getStudentApplications,
  deleteApplication,
} from "../../services/applicationService";
import { useAuth } from "../../Context/AuthContext";

import ApplicationCard from "../../components/Applicationcard";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessages";
import ConfirmDialog from "../../components/ConfirmDialog";

const MyApplications = () => {
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      if (!user?.id) {
        setError("User information not available.");
        return;
      }

      // IMPORTANT:
      // Backend expects User ID, not StudentProfile ID
      const data = await getStudentApplications(user.id);

      setApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load your applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const handleDeleteClick = (applicationId) => {
    setSelectedApplicationId(applicationId);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      setError("");

      await deleteApplication(selectedApplicationId);

      setApplications((prev) =>
        prev.filter(
          (application) => application.id !== selectedApplicationId
        )
      );

      setShowConfirm(false);
      setSelectedApplicationId(null);
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
    return <Loading message="Loading your applications..." />;
  }

  return (
    <div className="container py-5">

      <div className="mb-4">
        <h1 className="fw-bold">My Applications</h1>

        <p className="text-muted">
          Track the jobs you have applied for.
        </p>
      </div>

      {error && <ErrorMessage message={error} />}

      {!error && applications.length === 0 && (
        <div className="alert alert-info">
          You haven't applied for any jobs yet.
        </div>
      )}

      {!error && applications.length > 0 && (
        <div>
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        show={showConfirm}
        title="Delete Application"
        message="Are you sure you want to delete this application?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedApplicationId(null);
        }}
      />
    </div>
  );
};

export default MyApplications;

