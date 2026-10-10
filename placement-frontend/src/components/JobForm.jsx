
import { useEffect, useState } from "react";

const JobForm = ({
  initialData = {},
  onSubmit,
  loading = false,
  buttonText = "Save Job",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    skillsRequired: "",
    salary: "",
    deadline: "",
  });

  useEffect(() => {
    setFormData({
      title: initialData.title || "",
      company: initialData.company || "",
      location: initialData.location || "",
      description: initialData.description || "",
      skillsRequired: initialData.skillsRequired || "",
      salary: initialData.salary || "",
      deadline: initialData.deadline || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Job Title */}
      <div className="mb-3">
        <label className="form-label">Job Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Enter job title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Company */}
      <div className="mb-3">
        <label className="form-label">Company</label>
        <input
          type="text"
          name="company"
          className="form-control"
          placeholder="Enter company name"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      {/* Location */}
      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          name="location"
          className="form-control"
          placeholder="Enter job location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          rows="4"
          placeholder="Enter job description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Skills */}
      <div className="mb-3">
        <label className="form-label">Required Skills</label>
        <input
          type="text"
          name="skillsRequired"
          className="form-control"
          placeholder="Java, Spring Boot, SQL"
          value={formData.skillsRequired}
          onChange={handleChange}
        />
      </div>

      {/* Salary */}
      <div className="mb-3">
        <label className="form-label">Salary</label>
        <input
          type="text"
          name="salary"
          className="form-control"
          placeholder="e.g. 5 LPA"
          value={formData.salary}
          onChange={handleChange}
        />
      </div>

      {/* Deadline */}
      <div className="mb-3">
        <label className="form-label">Application Deadline</label>
        <input
          type="date"
          name="deadline"
          className="form-control"
          value={formData.deadline}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Saving..." : buttonText}
      </button>
    </form>
  );
};

export default JobForm;

