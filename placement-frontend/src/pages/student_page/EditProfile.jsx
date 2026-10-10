
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
  getProfileByUserId,
  createStudentProfile,
  updateStudentProfile,
} from "../../services/profileService";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessages";

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    college: "",
    course: "",
    graduationYear: "",
    bio: "",
    resumeUrl: "",
    skills: [],
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [existingProfile, setExistingProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!user?.id) {
          setError("User information not available.");
          setLoading(false);
          return;
        }

        const data = await getProfileByUserId(user.id);

        setExistingProfile(data);

        setProfile({
          fullName: data.fullName || "",
          phone: data.phone || "",
          college: data.college || "",
          course: data.course || "",
          graduationYear: data.graduationYear || "",
          bio: data.bio || "",
          resumeUrl: data.resumeUrl || "",
          skills: data.skills || [],
        });
      } catch (err) {
        // 404 means the student has not created a profile yet.
        if (err.response?.status === 404) {
          setExistingProfile(null);
        } else {
          console.error("Error loading profile:", err);

          setError(
            err.response?.data?.message ||
              "Failed to load profile."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("CREATE/UPDATE PROFILE BUTTON CLICKED");
    console.log("User:", user);
    console.log("Profile:", profile);
    console.log("Existing Profile:", existingProfile);
    if (!user?.id) {
      setError("User information not available.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const profileData = {
        fullName: profile.fullName,
        phone: profile.phone,
        college: profile.college,
        course: profile.course,
        graduationYear: profile.graduationYear
          ? Number(profile.graduationYear)
          : null,
        bio: profile.bio,
        resumeUrl: profile.resumeUrl,
        skills: profile.skills,
      };

      let response;

      if (existingProfile) {
        response = await updateStudentProfile(
          user.id,
          profileData,
          profilePicture
        );
      } else {
        response = await createStudentProfile(
          user.id,
          profileData,
          profilePicture
        );
      }

      setSuccess("Profile saved successfully.");

      setExistingProfile(response);

      setTimeout(() => {
        navigate("/student/profile");
      }, 1000);
    } catch (err) {
      console.error("Error saving profile:", err);

      setError(
        err.response?.data?.message ||
          "Failed to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Loading profile..." />;
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h1 className="fw-bold">
          {existingProfile
            ? "Edit Profile"
            : "Create Profile"}
        </h1>

        <p className="text-muted">
          Add your academic and personal information.
        </p>
      </div>

      {error && <ErrorMessage message={error} />}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body p-4">
         <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                className="form-control"
                value={profile.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="form-label">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                className="form-control"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            {/* College */}
            <div className="mb-3">
              <label className="form-label">
                College
              </label>

              <input
                type="text"
                name="college"
                className="form-control"
                value={profile.college}
                onChange={handleChange}
                placeholder="Enter your college"
              />
            </div>

            {/* Course */}
            <div className="mb-3">
              <label className="form-label">
                Course
              </label>

              <input
                type="text"
                name="course"
                className="form-control"
                value={profile.course}
                onChange={handleChange}
                placeholder="e.g. B.E. Information Technology"
              />
            </div>

            {/* Graduation Year */}
            <div className="mb-3">
              <label className="form-label">
                Graduation Year
              </label>

              <input
                type="number"
                name="graduationYear"
                className="form-control"
                value={profile.graduationYear}
                onChange={handleChange}
                placeholder="e.g. 2027"
              />
            </div>

            {/* Bio */}
            <div className="mb-3">
              <label className="form-label">
                Bio
              </label>

              <textarea
                name="bio"
                className="form-control"
                rows="4"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell recruiters about yourself"
              />
            </div>

{/* Resume URL */}
<div className="mb-3">
  <label className="form-label">
    Resume URL
  </label>

  <input
    type="text"
    name="resumeUrl"
    className="form-control"
    value={profile.resumeUrl || ""}
    onChange={handleChange}
    placeholder="https://..."
  />
</div>



            {/* Profile Picture */}
            <div className="mb-4">
              <label className="form-label">
                Profile Picture
              </label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handlePictureChange}
              />

              <small className="text-muted">
                Select an image to upload a new profile picture.
              </small>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : existingProfile
                  ? "Update Profile"
                  : "Create Profile"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  navigate("/student/profile")
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

