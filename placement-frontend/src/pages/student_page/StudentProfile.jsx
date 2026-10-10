
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
    getProfileByUserId,
    removeSkillFromProfile
} from "../../services/profileService";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessages";

const StudentProfile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
const handleRemoveSkill = async (skillId) => {

    try {

        const updatedProfile =
            await removeSkillFromProfile(
                user.id,
                skillId
            );

        setProfile(updatedProfile);

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Failed to remove skill"
        );
    }
};
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user?.id) {
          setError("User information not available.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError("");

        const data = await getProfileByUserId(user.id);

        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);

        if (err.response?.status === 404) {
          setError(
            "Student profile not found. Please create your profile."
          );
        } else {
          setError(
            err.response?.data?.message ||
              "Failed to load student profile."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <Loading message="Loading profile..." />;
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">My Profile</h1>
          <p className="text-muted mb-0">
            View your student profile information.
          </p>
        </div>

        <Link
          to="/student/profile/edit"
          className="btn btn-primary"
        >
          Edit Profile
        </Link>
      </div>

      {/* Error */}
      {error && <ErrorMessage message={error} />}

      {/* Profile */}
      {profile && (
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <div className="row">
              {/* Profile Picture */}
              <div className="col-md-4 text-center mb-4 mb-md-0">
                {profile.profilePictureUrl ? (
                  <img
                    src={profile.profilePictureUrl}
                    alt="Profile"
                    className="img-fluid rounded-circle"
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center mx-auto"
                    style={{
                      width: "180px",
                      height: "180px",
                      fontSize: "60px",
                    }}
                  >
                    <i className="bx bx-user"></i>
                  </div>
                )}

                <h4 className="mt-3">
                  {profile.fullName || user?.username}
                </h4>
              </div>

              {/* Profile Information */}
              <div className="col-md-8">
                <h4 className="fw-bold mb-4">
                  Personal & Academic Details
                </h4>

                <div className="row g-3">
                  <div className="col-md-6">
                    <strong>Full Name</strong>
                    <p className="text-muted">
                      {profile.fullName || "Not provided"}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <strong>Phone</strong>
                    <p className="text-muted">
                      {profile.phone || "Not provided"}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <strong>College</strong>
                    <p className="text-muted">
                      {profile.college || "Not provided"}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <strong>Course</strong>
                    <p className="text-muted">
                      {profile.course || "Not provided"}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <strong>Graduation Year</strong>
                    <p className="text-muted">
                      {profile.graduationYear || "Not provided"}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <strong>Email</strong>
                    <p className="text-muted">
                      {user?.email || "Not available"}
                    </p>
                  </div>

                  <div className="col-12">
                    <strong>Bio</strong>
                    <p className="text-muted">
                      {profile.bio || "No bio added."}
                    </p>
                  </div>

                  {/* Skills */}
                <strong>Skills</strong>

<div className="d-flex flex-wrap justify-content-center gap-3 mt-2">
    {profile.skills && profile.skills.length > 0 ? (
        profile.skills.map((skill) => (
            <div
                key={skill.id}
                className="d-flex flex-column align-items-center"
            >
                <span className="badge bg-primary">
                    {skill.name}
                </span>

                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger py-0 px-1 mt-1"
                    style={{ fontSize: "10px" }}
                    onClick={() => handleRemoveSkill(skill.id)}
                >
                    Remove
                </button>
            </div>
        ))
    ) : (
        <p className="text-muted w-100 text-center">
            No skills added.
        </p>
    )}
</div>

                  {/* Resume */}
                  <div className="col-12">
                    <strong>Resume</strong>

                    <div className="mt-2">
                      {profile.resumeUrl ? (
                        <a
                          href={profile.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-sm"
                        >
                          <i className="bx bx-file me-1"></i>
                          View Resume
                        </a>
                      ) : (
                        <p className="text-muted">
                          No resume uploaded.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Profile */}
      {!profile && !error && (
        <div className="text-center">
          <p className="text-muted">
            You haven't created your student profile yet.
          </p>

          <Link
            to="/student/profile/edit"
            className="btn btn-primary"
          >
            Create Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;

