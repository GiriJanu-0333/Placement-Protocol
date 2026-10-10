
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../services/jobService";

const AddJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    skillsRequired: "",
    salary: "",
    deadline: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await createJob(formData);

      navigate("/admin/jobs");
    } catch (error) {
      console.error("Error creating job:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card shadow">
            <div className="card-body p-4">

              <h2 className="mb-4">Add Job</h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Job Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter job title"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Company
                  </label>

                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter job location"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    name="description"
                    className="form-control"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter job description"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Required Skills
                  </label>

                  <input
                    type="text"
                    name="skillsRequired"
                    className="form-control"
                    value={formData.skillsRequired}
                    onChange={handleChange}
                    placeholder="Example: Java, Spring Boot, SQL"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Salary
                  </label>

                  <input
                    type="text"
                    name="salary"
                    className="form-control"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Example: 5 LPA"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Application Deadline
                  </label>

                  <input
                    type="date"
                    name="deadline"
                    className="form-control"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Job"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/admin/jobs")}
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddJob;

