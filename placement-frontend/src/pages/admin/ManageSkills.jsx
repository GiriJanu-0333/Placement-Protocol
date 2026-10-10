
import { useEffect, useState } from "react";
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../services/skillService";

import SkillList from "../../components/SkillList";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessages";
import ConfirmDialog from "../../components/ConfirmDialog";

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [skillName, setSkillName] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  // Fetch skills
  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllSkills();
      setSkills(data);
    } catch (err) {
      console.error("Error fetching skills:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load skills."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Add skill
  const handleAddSkill = async (e) => {
    e.preventDefault();

    if (!skillName.trim()) {
      setError("Please enter a skill name.");
      return;
    }

    try {
      setError("");

      const newSkill = await createSkill({
        name: skillName.trim(),
      });

      setSkills((prevSkills) => [
        ...prevSkills,
        newSkill,
      ]);

      setSkillName("");
    } catch (err) {
      console.error("Error creating skill:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create skill."
      );
    }
  };

  // Start editing
  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setSkillName(skill.name);
  };

  // Update skill
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!skillName.trim()) {
      setError("Please enter a skill name.");
      return;
    }

    try {
      setError("");

      const updatedSkill = await updateSkill(
        editingSkill.id,
        {
          name: skillName.trim(),
        }
      );

      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === editingSkill.id
            ? updatedSkill
            : skill
        )
      );

      setEditingSkill(null);
      setSkillName("");
    } catch (err) {
      console.error("Error updating skill:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update skill."
      );
    }
  };

  // Open delete confirmation
  const handleDeleteClick = (skillId) => {
    setSelectedSkillId(skillId);
    setShowConfirm(true);
  };

  // Delete skill
  const handleDelete = async () => {
    try {
      setError("");

      await deleteSkill(selectedSkillId);

      setSkills((prevSkills) =>
        prevSkills.filter(
          (skill) => skill.id !== selectedSkillId
        )
      );
    } catch (err) {
      console.error("Error deleting skill:", err);
      setError(
        err.response?.data?.message ||
          "Failed to delete skill."
      );
    } finally {
      setShowConfirm(false);
      setSelectedSkillId(null);
    }
  };

  if (loading) {
    return <Loading message="Loading skills..." />;
  }

  return (
    <div className="container py-5">

      <div className="mb-4">
        <h1 className="fw-bold">Manage Skills</h1>
        <p className="text-muted">
          Add, update and delete placement skills.
        </p>
      </div>

      {error && (
        <div className="mb-3">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Add / Edit Skill */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <h5 className="fw-bold mb-3">
            {editingSkill ? "Edit Skill" : "Add Skill"}
          </h5>

          <form
            onSubmit={
              editingSkill
                ? handleUpdate
                : handleAddSkill
            }
          >
            <div className="row g-2">

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter skill name"
                  value={skillName}
                  onChange={(e) =>
                    setSkillName(e.target.value)
                  }
                />
              </div>

              <div className="col-md-3 d-flex gap-2">

                <button
                  type="submit"
                  className="btn btn-primary flex-fill"
                >
                  {editingSkill
                    ? "Update"
                    : "Add"}
                </button>

                {editingSkill && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingSkill(null);
                      setSkillName("");
                      setError("");
                    }}
                  >
                    Cancel
                  </button>
                )}

              </div>

            </div>
          </form>

        </div>
      </div>

      {/* Skills */}
      {skills.length === 0 ? (
        <div className="alert alert-info">
          No skills found.
        </div>
      ) : (
        <SkillList
          skills={skills}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Confirm Delete */}
      <ConfirmDialog
        show={showConfirm}
        title="Delete Skill"
        message="Are you sure you want to delete this skill?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedSkillId(null);
        }}
      />

    </div>
  );
};

export default ManageSkills;

